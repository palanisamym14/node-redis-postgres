import { Request, Response, Router } from "express";
import { constructError, outboundschema,
  schemaValidator } from "./../_helpers/joivalidation";
import * as auth from "./../middleware/authToken";
import { InBoundService } from "./../service/inbound.service";

export class InBoundSMSController {
  public path = "/inbound";
  public router = Router();
  public multipartMiddleware: any;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(`${this.path}/sms`, this.inBoundSMS);
  }

  public inBoundSMS = async ( request: Request, response: Response, next ) => {
    console.log(request)
    try {
      // const data = await schemaValidator(request.body, outboundschema);
      return new InBoundService().getInBoundService(request, response);
    } catch (error) {
      return response.status(500).json(constructError(error));
    }
  }
}
