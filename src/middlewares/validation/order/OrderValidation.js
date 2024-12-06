const Joi = require('joi');
const ClientError = require('../../../errors/ClientError');

const schema = Joi.object({
  barangId: Joi.string()
    .required(),
  jumlah: Joi.number().integer() .positive()
    .required()
});

const validate = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {             
      throw new ClientError(error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validate;