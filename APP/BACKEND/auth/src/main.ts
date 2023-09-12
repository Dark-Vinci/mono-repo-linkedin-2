/* eslint-disable @typescript-eslint/no-var-requires */
import cluster from 'cluster';
import { cpus } from 'os';

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import {
  TIME_ZONE,
  ServicePort,
  ServiceProtoPath,
  GRPC_LOADER_OPTIONS,
  ServiceName,
  TerminationSignal,
  ClusterSignal,
  zeroUUID,
  logFiles,
  AppState,
} from 'sdk/dist/constants';
import { GlobalLogger, MyLogger as Logger } from 'sdk/dist/helpers';

import { ShutdownService, AppModule } from '@startup';

class App {
  private readonly isDevMode = process.env.NODE_ENV !== AppState.PRODUCTION;
  private readonly numCPUs = this.isDevMode ? 1 : cpus().length;

  private readonly globalLogger = new GlobalLogger(...logFiles).getLogger;
  private readonly logger = Logger.setContext(
    'main.ts',
    'void',
    zeroUUID,
    this.globalLogger,
  );

  public constructor() {
    // set the logger to be a global Object
    global.logger = this.globalLogger as any;
  }

  private primaryWorker(): void {
    this.logger.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < this.numCPUs; i++) {
      cluster.fork();
    }

    cluster.on(ClusterSignal.EXIT, (worker, code, signal) => {
      this.logger.log(`${signal}| ${code}`);
      // for a new worker if this is not dev mode
      if (this.isDevMode) {
        cluster.fork();
      }
      this.logger.log(`worker ${worker.process.pid} died`);
    });
  }

  private async childWorker(): Promise<void> {
    try {
      // set time zone
      process.env.TZ = TIME_ZONE;

      // instanciate application
      const app = await NestFactory.create(AppModule);
      const shutdownService = app.get(ShutdownService);

      // listen all SIGINT kernel signals
      process.on(TerminationSignal.SIGINT, async () => {
        await shutdownService.shutdown();
        process.exit(0);
      });

      // handle all SIGTERM kernel signals
      process.on(TerminationSignal.SIGTERM, async () => {
        await shutdownService.shutdown();
        process.exit(0);
      });

      // handle all SIGHUP kernel signals
      process.on(TerminationSignal.SIGHUP, async () => {
        await shutdownService.shutdown();
        process.exit(0);
      });

      // set all needed grpc options
      const grpcClientOptions: MicroserviceOptions = {
        transport: Transport.GRPC,
        options: {
          package: ServiceName.AUTH,
          gracefulShutdown: true,
          protoPath: <string[]>(<unknown>ServiceProtoPath.AUTH),
          loader: GRPC_LOADER_OPTIONS,
          url: `localhost:${ServicePort.AUTH}`,
        },
      };

      app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

      // start microservices and log necessary logs data
      await app.startAllMicroservices();
      await app.listen(ServicePort.AUTH);
      const url = await app.getUrl();

      this.logger.log(`Worker ${process.pid} started on URL| ${url}`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // bootstrap application
  public async start(): Promise<void> {
    if (cluster.isPrimary) {
      this.primaryWorker();
    } else {
      await this.childWorker();
    }
  }
}

new App().start();
