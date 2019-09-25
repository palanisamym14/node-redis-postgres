import cluster from "cluster";
import os from "os";
class ClusterServer {
    public numCPUs: number = os.cpus().length;
    public createCluster() {
        if (cluster.isMaster) {
            // tslint:disable-next-line: no-console
            console.log(`Master ${process.pid} is running`);
            for (let i = 0; i < this.numCPUs; i++) {
                cluster.fork();
            }
            cluster.on("exit", (worker, code, signal) => {
                // tslint:disable-next-line:no-console
                console.log(`worker ${worker.process.pid} died`);
            });
            cluster.on("online", (worker) => {
                // tslint:disable-next-line: no-console
                console.log("Worker " + worker.process.pid + " is listening");
            });
        } else {
            const server = require("./index");
        }
    }
}
export default new ClusterServer().createCluster();
