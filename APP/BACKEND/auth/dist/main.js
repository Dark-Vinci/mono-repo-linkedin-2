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
const _startup_1 = require("./startup");
class App {
    constructor() {
        this.isDevMode = false;
        this.numCPUs = this.isDevMode ? 1 : (0, os_1.cpus)().length;
    }
    primaryWorker() {
        console.log(`Primary ${process.pid} is running`);
        for (let i = 0; i < this.numCPUs; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on('exit', (worker, code, signal) => {
            console.log({ code, signal });
            if (this.isDevMode) {
                cluster_1.default.fork();
            }
            console.log(`worker ${worker.process.pid} died`);
        });
    }
    async childWorker() {
        try {
            process.env.TZ = 'Africa/Lagos';
            const app = await core_1.NestFactory.create(_startup_1.AppModule);
            const shutdownService = app.get(_startup_1.ShutdownService);
            process.on('SIGINT', async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            process.on('SIGTERM', async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            process.on('SIGHUP', async () => {
                await shutdownService.shutdown();
                process.exit(0);
            });
            const grpcClientOptions = {
                transport: microservices_1.Transport.GRPC,
                options: {
                    package: 'auth',
                    gracefulShutdown: true,
                    protoPath: [
                        '../SDK/src/grpc/auth/auth.proto',
                        '../SDK/src/grpc/auth/request.proto',
                        '../SDK/src/grpc/auth/response.proto',
                    ],
                    loader: {
                        keepCase: false,
                        defaults: true,
                        arrays: true,
                        objects: true,
                        oneofs: true,
                        json: true,
                    },
                },
            };
            app.connectMicroservice(grpcClientOptions);
            app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
            await app.startAllMicroservices();
            await app.listen(3000);
            const url = await app.getUrl();
            console.log(`Worker ${process.pid} started on URL| ${url}`);
        }
        catch (error) {
            console.log({ error });
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