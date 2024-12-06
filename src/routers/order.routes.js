const express = require('express');
const {passport, authenticateJWT} = require('../passport');

const router = express.Router();

const OrderValidation = require('../middlewares/validation/order/OrderValidation');

const { orderItem } = require('../controllers');

router.post('/order', authenticateJWT , OrderValidation ,orderItem);


module.exports = router;