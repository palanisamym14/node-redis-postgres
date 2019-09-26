import _res from "./../_helpers/response.helper";
import { SMSContants } from "./../_helpers/sms.constant";
import DataBaseConnection from "./../db";
import redis from "./../redis";
export class OutBoundService {
  private redis: any;
  private sequlize = DataBaseConnection.sequelize;

  constructor() {
    this.redis = redis.get();
  }
  public getOutBoundService = async (req, res) => {
    try {
      const reqBody = req.body;
      if (!reqBody) {
        return _res.statusOk(req, res, SMSContants.EMPTY_REQUEST);
      }
      const result = await this.sequlize.query(`SELECT * FROM phone_number where number = '${reqBody.from}'`);
      if (!result[0].length) {
        return _res.statusOk(req, res, SMSContants.FROM_NOT_FOUND);
      }
      const key = reqBody.from + reqBody.to;
      return _res.statusOk(req, res, SMSContants.INBOUND_SMS_OK);
    } catch (err) {
      return _res.statusError(res, err);
    }
  }
}
