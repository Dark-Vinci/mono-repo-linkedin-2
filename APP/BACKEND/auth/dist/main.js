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
const sdk_1 = require("sdk");
const _startup_1 = require("./startup");
const _app_1 = require("./app");
class App {
    constructor() {
        this.isDevMode = process.env.NODE_ENV !== sdk_1.AppState.PRODUCTION;
        this.numCPUs = this.isDevMode ? 1 : (0, os_1.cpus)().length;
        this.globalLogger = new sdk_1.GlobalLogger(...sdk_1.logFiles).getLogger;
        this.logger = sdk_1.MyLogger.setContext('main.ts', 'void', sdk_1.zeroUUID, this.globalLogger);
        global.logger = this.globalLogger;
    }
    primaryWorker() {
        this.logger.log(`Primary ${process.pid} is running`);
        for (let i = 0; i < this.numCPUs; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on(sdk_1.ClusterSignal.EXIT, (worker, code, signal) => {
            this.logger.log(`${signal}| ${code}`);
            if (this.isDevMode) {
                cluster_1.default.fork();
            }
            this.logger.log(`worker ${worker.process.pid} died`);
        });
    }
    async childWorker() {
        try {
            process.env.TZ = sdk_1.TIME_ZONE;
            const app = await core_1.NestFactory.create(_startup_1.AppModule);
            const shutdownService = app.get(_startup_1.ShutdownService);
            process.on(sdk_1.TerminationSignal.SIGINT, async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            process.on(sdk_1.TerminationSignal.SIGTERM, async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            process.on(sdk_1.TerminationSignal.SIGHUP, async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            const grpcClientOptions = {
                transport: microservices_1.Transport.GRPC,
                options: {
                    package: sdk_1.ServiceName.AUTH,
                    gracefulShutdown: true,
                    protoPath: sdk_1.ServiceProtoPath.AUTH,
                    loader: sdk_1.GRPC_LOADER_OPTIONS,
                    url: `localhost:${sdk_1.ServicePort.AUTH}`,
                },
            };
            app.connectMicroservice(grpcClientOptions);
            app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
            app.useGlobalFilters(new _app_1.ExceptionFilter());
            await app.startAllMicroservices();
            await app.listen(sdk_1.ServicePort.AUTH);
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