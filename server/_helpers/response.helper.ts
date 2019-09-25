class ResponseHelper {
    public statusOk = (req: any, res: any, data: any) => {
        this.jsonResponse(res, data);
    }
    public jsonResponse(res: any, body: { responseBody: any; }) {
        const options = Object(body) || {};
        options.status = options.status || 200;
        res.status(options.status).json(body.responseBody || null);
    }
}

export default new ResponseHelper();
