import { Request, Response, Router } from "express";
import _res from "./../_helpers/response.helper";
import { SMSschema } from "./../_helpers/joivalidation";
import * as auth from "./../middleware/authToken";
import { InBoundService } from "./../service/inbound.service";
import { constructError } from "./../_helpers/util.helper";

export class InBoundSMSController {
  public path = "/inbound";
  public router = Router();
  public multipartMiddleware: any;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(`${this.path}/sms`, auth.validateToken, this.inBoundSMS);
  }

  public inBoundSMS = async ( request: Request, response: Response, next ) => {
    try {
      const smsSchema =  new SMSschema();
      const data = await smsSchema.schemaValidator(request.body, smsSchema.outboundschema);
      return new InBoundService().getInBoundService(request, response);
    } catch (error) {
      return _res.statusError(response, constructError(error));
    }
  }
}
