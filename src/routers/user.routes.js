const express = require('express');
const {passport, authenticateJWT} = require('../passport');

const { register, updateProfile, GoogleCheck, loginManual, logout, googleCallback, isiSaldo, getUserById} = require('../controllers');
const { registerRateLimiter, loginRateLimiter} = require('../middlewares/RateLimit');

const registerValidation = require('../middlewares/validation/user/RegisterValidation');
const updateProfileValidation = require('../middlewares/validation/user/UpdateProfileValidation');
const SaldoValidation = require('../middlewares/validation/user/SaldoValidation');

const router = express.Router();

router.post('/daftar', registerRateLimiter ,registerValidation, register);
router.post('/login', loginRateLimiter ,registerValidation ,loginManual);
router.get('/logout', authenticateJWT ,logout);

router.get('/userGoogle', loginRateLimiter ,passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/callback', googleCallback, GoogleCheck);

router.get('/profile', authenticateJWT, getUserById);
router.put('/profile', updateProfileValidation ,authenticateJWT, updateProfile);
router.put('/saldo', authenticateJWT, SaldoValidation ,isiSaldo);

module.exports = router;