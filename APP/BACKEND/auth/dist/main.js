"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const constants_1 = require("sdk/dist/constants");
const helpers_1 = require("sdk/dist/helpers");
const _startup_1 = require("./startup");
class App {
    constructor() {
        this.isDevMode = process.env.NODE_ENV !== constants_1.AppState.PRODUCTION;
        this.numCPUs = this.isDevMode ? 1 : (0, os_1.cpus)().length;
        this.globalLogger = new helpers_1.GlobalLogger(...constants_1.logFiles).getLogger;
        this.logger = helpers_1.MyLogger.setContext('main.ts', 'void', constants_1.zeroUUID, this.globalLogger);
        global.logger = this.globalLogger;
    }
    primaryWorker() {
        this.logger.log(`Primary ${process.pid} is running`);
        for (let i = 0; i < this.numCPUs; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on(constants_1.ClusterSignal.EXIT, (worker, code, signal) => {
            this.logger.log(`${signal}| ${code}`);
            if (this.isDevMode) {
                cluster_1.default.fork();
            }
            this.logger.log(`worker ${worker.process.pid} died`);
        });
    }
    async childWorker() {
        try {
            process.env.TZ = constants_1.TIME_ZONE;
            const app = await core_1.NestFactory.create(_startup_1.AppModule);
            const shutdownService = app.get(_startup_1.ShutdownService);
            process.on(constants_1.TerminationSignal.SIGINT, async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            process.on(constants_1.TerminationSignal.SIGTERM, async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            process.on(constants_1.TerminationSignal.SIGHUP, async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            const grpcClientOptions = {
                transport: microservices_1.Transport.GRPC,
                options: {
                    package: constants_1.ServiceName.AUTH,
                    gracefulShutdown: true,
                    protoPath: constants_1.ServiceProtoPath.AUTH,
                    loader: constants_1.GRPC_LOADER_OPTIONS,
                    url: `localhost:${constants_1.ServicePort.AUTH}`,
                },
            };
            app.connectMicroservice(grpcClientOptions);
            app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
            await app.startAllMicroservices();
            await app.listen(constants_1.ServicePort.AUTH);
            const url = await app.getUrl();
            this.logger.log(`Worker ${process.pid} started on URL| ${url}`);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async start() {
        if (cluster_1.default.isPrimary) {
            this.primaryWorker();
        }
        else {
            await this.childWorker();
        }
    }
}
new App().start();
//# sourceMappingURL=main.js.map