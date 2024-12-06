const userControllers = require('./user.controller');
const orderControllers = require('./order.controller');

module.exports = {
  ...userControllers,
  ...orderControllers,
};