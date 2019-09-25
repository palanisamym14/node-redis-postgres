import redis from "../redis";
const stopStrArr = ["STOP", "STOP\n", "STOP\r", "STOP\r\n"];
import DataBaseConnection from "./../db";
export class InBoundService {
  private redis: any;
  private sequlize = DataBaseConnection.sequelize;
  constructor() {
    this.redis = redis.get();
  }
  public getInBoundService = async (req, res) => {
    try {
      const result  = await this.sequlize.query("SELECT * FROM `users`")
      return this.redis.get(`wikipedia:palani`, (err, result) => {
        if (result) {
          const resultJSON = JSON.parse(result);
          return res.status(200).json(resultJSON);
        } else {
          this.redis.setex(
            `wikipedia:palani`,
            3600,
            JSON.stringify({ source: "Redis Cache", data: "ddsdsdsdsdsds" })
          );
          return res
            .status(200)
            .json({ source: "Wikipedia API", data: "ddsdsdsdsdsds" });
        }
      });
    } catch (err) {
      throw err;
    }
  };
}
