const Joi = require("joi");
export const outboundschema = Joi.object().keys({
  birthyear: Joi.number()
    .integer()
    .min(3)
    .required(),
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});
export const schemaValidator = (input, reqSchema) =>
  Joi.validate(input, reqSchema);

export const constructError = (err) => {
  if (err && err.details && Array.isArray(err.details)) {
    return err.details.map((e) => e.context.key).join(",").concat(" is missing");
  }
  return err;
};
