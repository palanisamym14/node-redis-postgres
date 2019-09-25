import redis from "./../redis";
const stopStrArr = ["STOP", "STOP\n", "STOP\r", "STOP\r\n"];
export class OutBoundService {
    private redis: any;
  constructor() {

    this.redis = redis.get();
  }
  public getOutBoundService = (req, res) => {
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
  };
}