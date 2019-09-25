import redis from "redis";

class RedisServer {
  public redisServer: any;
  constructor() {
    this.redisServer = redis.createClient();
    // Print redis errors to the console
    this.redisServer.on("error", (err) => {
      // tslint:disable-next-line:no-console
      console.log("Error " + err);
    });
  }
  public get() {
    return this.redisServer;
  }
}
export default new RedisServer();
