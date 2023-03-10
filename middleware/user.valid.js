const joi = require("joi");
const schema = joi.object({
  name: joi.string().required().min(3).max(10),
  email: joi.string().email().required(),
  password: joi.string().required(),
  repassword: joi.ref("password"),
  age: joi.number().min(16).max(50),
  phone: joi.number().required(),
});
let paramSchema = joi.object({
  id: joi.string().min(24).max(24).required(),
});
module.exports.paramValidation = (req, res, next) => {
  let userError = [];
  let { error } = paramSchema.validate(req.params, { abortEarly: false });
  console.log(error);
  if (!error) {
    next();
  } else {
    error.details.map((msg) => {
      userError.push(msg.message);
    });
    res.json(userError);
  }
};
module.exports.userValidation = (req, res, next) => {
  let userError = [];
  let { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) {
    next();
  } else {
    error.details.map((msg) => {
      userError.push(msg.message);
    });
    res.json(userError);
  }
};
