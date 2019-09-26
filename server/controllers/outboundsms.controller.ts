import { Request, Response, Router } from "express";
import _res from "./../_helpers/response.helper";
import { OutBoundService } from "./../service/outbound.service";
// tslint:disable-next-line:ordered-imports
import { SMSschema } from "./../_helpers/joivalidation";
import { constructError } from "./../_helpers/util.helper";
export class OutBoundSMSController {
  public path = "/outbound";
  public router = Router();
  public multipartMiddleware: any;
  public redis: any;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(`${this.path}/sms`, this.outBoundSMS);
  }

  public outBoundSMS = async ( request: Request, response: Response, next ) => {
    try {
      const smsSchema =  new SMSschema();
      const data = await smsSchema.schemaValidator(request.body, smsSchema.outboundschema);
      return new OutBoundService().getOutBoundService(request, response);
    } catch (error) {
      return _res.statusError(response, constructError(error));
    }
  }
}