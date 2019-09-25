import { Router } from "express";
import { Request, Response } from "express";
import { HttpClientConnService } from "../service/httpclientService/httpclient.service";
import _res from "./../_helpers/response.helper";

export class HttpClientController {
    public path = "/curl";
    public router = Router();
    constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        this.router.get(`${this.path}/get`, this.getRequest);
    }
    public getRequest = async (request: Request, response: Response, next) => {
        const userService = new HttpClientConnService();
        try {
            const data = await userService.getRequest(request.query.url);
            return _res.statusOk(request, response, data);
        } catch (error) {
            return _res.statusOk(request, response, error);
        }
    }
}
