const { PrismaClient } = require("@prisma/client");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
require('dotenv').config();


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await prisma.customer.findUnique({
      where: { email: profile.emails[0].value },
    });

    if (!user) {
      user = await prisma.customer.create({
        data: {
          email: profile.emails[0].value,
          nama: profile.displayName,
          fotoProfil: profile.photos[0].value,
        },
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return done(null, { user, token });
  } catch (error) {
    return done(error);
  }
}));

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await prisma.customer.findUnique({ where: { email } });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const isPasswordValid = user.password === password; 
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
      );

      return done(null, { user, token }); 
    } catch (err) {
      return done(err);
    }
  }
));

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token is missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user; 
    next();
  });
}

module.exports = { passport, authenticateJWT };
