
export class SucessResponse {
    public responseBody: any;
    public status: number;
    constructor(public res: any, public code?: number) {
        this.responseBody  = res;
        this.status = code || 200;
    }
}
// tslint:disable-next-line:max-classes-per-file
export class ErrorResponse {
    public responseBody: any;
    public status: number;
    constructor(public res: any, public code?: number) {
        this.responseBody  = res;
        this.status = code || 500;
    }
}
