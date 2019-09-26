import * as joi from "joi";

export const outboundschema = joi.object({
  from: joi.number()
    .integer()
    .min(6)
    .max(16),
  text: joi.string()
    .alphanum()
    .min(1)
    .max(120)
    .required(),
  to: joi.number()
    .integer()
    .min(6)
    .max(16)
    .required()
});
export const schemaValidator = (input, reqSchema) => {
  return joi.validate(input, reqSchema);
};

export const constructError = (err) => {
  const errorResp = {
    error: "",
    message: ""
  };
  if (err && err.details && Array.isArray(err.details)) {
    return errorResp.error = err.details.map((e) => e.context.key).join(",").concat(" is missing");
  }
  return errorResp.error = err;
};
