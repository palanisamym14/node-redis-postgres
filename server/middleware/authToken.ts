import _res from "./../_helpers/response.helper";
import { SMSContants } from "./../_helpers/sms.constant";
import DataBaseConnection from "./../db";

export const validateToken = async (req, res, next) => {
  const sequlize = DataBaseConnection.sequelize;
  const username = req.headers["x-username"];
  const auth_id = req.headers["x-auth_id"];
  if (!username || !auth_id) {
    return _res.statusOk(req, res, SMSContants.MISSING_HEADER, 401);
  }
  try {
    const result = await sequlize.query(
      `SELECT * FROM account where username = '${username}' and auth_id = '${auth_id}'`
    );
    if (!result[0].length) {
      return _res.statusOk(req, res, SMSContants.INVALID_HEADER);
    }
    next();
  } catch (err) {
    return _res.statusError(res, err);
  }
};
