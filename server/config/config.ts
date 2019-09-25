import { config, InterfaceConfig } from "./config.interface";
import * as defaultConfig from "./default.config";

class DefaultConfig {
  public NODE_ENV = process.env.NODE_ENV;
  public config: InterfaceConfig = defaultConfig.config;
  constructor() {
    // tslint:disable-next-line:no-console
    console.log(this.NODE_ENV);
    switch (this.NODE_ENV) {
      case config.STAGGING:
        this.config = defaultConfig.config;
        break;
      default:
        this.config = defaultConfig.config;
        break;
    }
  }
}

export default new DefaultConfig();
