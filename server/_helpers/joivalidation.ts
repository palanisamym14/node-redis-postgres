import joi from "@hapi/joi";
export class SMSschema {
  public outboundschema = joi.object({
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

  public schemaValidator = (input, reqSchema) => {
    try {
      const valid = reqSchema.validate(input);
      if (valid["error"] && Object.keys(valid["error"]).length > 0) {
        throw valid;
      }
      return true;
    } catch (error) {
      throw error;
    }
  };
}
