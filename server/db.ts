import * as SqlConnection from "sequelize";
import appConfig from "./config/config";

class DataBaseConnection {
  public state: any = {
    db: null,
    mode: null
  };
  public sequelize: SqlConnection.Sequelize;

  public async connect() {
    const DB = appConfig.config.Database;
    this.sequelize = new SqlConnection.Sequelize(
      DB.DBNAME,
      DB.USERNAME,
      DB.PASSWORD,
      {
        dialect: "postgres",
        logging: true
      }
    );
    return true;
  }

  public get() {
    return this.sequelize;
  }
}
export default new DataBaseConnection();
