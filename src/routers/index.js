const express = require('express');

const userRoutes = require('./user.routes');
const orderRoutes = require('./order.routes');

const router = express.Router();

router.use('', userRoutes);
router.use('', orderRoutes);

module.exports = router;