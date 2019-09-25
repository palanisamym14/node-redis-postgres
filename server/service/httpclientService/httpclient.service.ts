import fetch from "node-fetch";
import { ErrorResponse, SucessResponse } from "./../../_helpers/response.header";
import { validateURL } from "./../../_helpers/util.helper";

export class HttpClientConnService {
    public getRequest = async (url: any) => {
        if (validateURL(url)) {
            const response = await fetch(url);
            const data = await response.json();
            return new SucessResponse(data);

        } else {
            return new ErrorResponse({msg: "invalid URL"});
        }
    }
}
