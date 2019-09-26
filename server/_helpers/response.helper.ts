class ResponseHelper {
    public statusOk = (req: any, res: any, data: any,status = 200) => {
        this.jsonResponse(res, data, status);
    }
    public jsonResponse(res: any, body: any, status) {
        status = status || 200;
        let resBody;
        if (status === 200) {
            resBody = {message: body, error: ""};
        } else {
            resBody = {message: "", error: body};
        }
        res.status(status).json(resBody || null);
    }
    public statusError = (res: any, data: any, status = 500) => {
        this.jsonResponse(res, data, status);
    }
}

export default new ResponseHelper();
