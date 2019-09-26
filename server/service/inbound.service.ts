import redis from "../redis";
const stopStrArr = ["STOP", "STOP\n", "STOP\r", "STOP\r\n"];
const expiryDuration = 14400;
import _res from "./../_helpers/response.helper";
import { SMSContants } from "./../_helpers/sms.constant";
import DataBaseConnection from "./../db";

export class InBoundService {
  private redis: any;
  private sequlize = DataBaseConnection.sequelize;
  constructor() {
    this.redis = redis.get();
  }
  public getInBoundService = async (req, res) => {
    try {
      const reqBody = req.body;
      if (!reqBody) {
        return _res.statusOk(req, res, SMSContants.EMPTY_REQUEST);
      }
      const result = await this.sequlize.query(
        `SELECT * FROM phone_number where number = '${reqBody.from}'`
      );
      if (!result[0].length) {
        return _res.statusOk(req, res, SMSContants.FROM_NOT_FOUND);
      }
      const key = reqBody.from;
      this.redis.get(key, (err, smscount) => {
        const count = Number(smscount);
        if (!!count) {
          this.redis.setex(key, 1);
          this.redis.setex(key, expiryDuration);
        } else if (smscount <= 50) {
          this.redis.setex(key, 1);
        } else {
          return _res.statusOk(req, res, `${key} ${SMSContants.LIMIT_EXCEED}`);
        }
        return _res.statusOk(req, res, SMSContants.OUTBOUND_SMS_OK);
      });
    } catch (err) {
      return _res.statusError(res, err);
    }
  }
}
