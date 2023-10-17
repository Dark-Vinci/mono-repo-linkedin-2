import cluster from 'cluster';
import { cpus } from 'os';
import process, { exit, env, pid } from 'process';
import global from 'globals';

import winston from 'winston';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import {
  TIME_ZONE,
  GRPC_LOADER_OPTIONS,
  ServiceProtoPath,
  zeroUUID,
  logFiles,
  ServiceName,
  TerminationSignal,
  ClusterSignal,
  ServicePort,
  AppState,
  GlobalLogger,
  MyLogger as Logger,
} from 'sdk';

import { ShutdownService, AppModule } from '@startup';
import { ExceptionFilter } from '@app';
import { MAIN_VOID } from '@constants';

class App {
  private readonly isDevMode = env.NODE_ENV !== AppState.PRODUCTION;
  private readonly numCPUs = this.isDevMode ? 1 : cpus().length;

  private readonly globalLogger = new GlobalLogger(...logFiles, {
    collection: 'auth_logger',
    db: 'mongodb://miwa:miwa@127.0.0.1:27017',
    level: 'silly',
  }).getLogger();

  private readonly logger = Logger.setContext(
    __filename,
    MAIN_VOID,
    zeroUUID,
    this.globalLogger,
  );

  public constructor() {
    // set the logger to be a global Object
    global.logger = this.globalLogger as winston.Logger;
  }

  private primaryWorker(): void {
    this.logger.log(`Primary ${pid} is running`);

    // Fork workers.
    for (let i = 0; i < this.numCPUs; i++) {
      cluster.fork();
    }

    cluster.on(
      ClusterSignal.EXIT,
      (worker: { process: { pid: any } }, code: any, signal: any) => {
        this.logger.log(`${signal}| ${code}`);
        // for a new worker if this is not dev mode
        if (!this.isDevMode) {
          cluster.fork();
        }
        this.logger.log(`worker ${worker.process.pid} died`);
      },
    );
  }

  private async childWorker(): Promise<void> {
    try {
      // set time zone
      env.TZ = TIME_ZONE;

      // instance application
      const {
        get,
        connectMicroservice,
        useGlobalFilters,
        useGlobalPipes,
        startAllMicroservices,
        listen,
        getUrl,
      } = await NestFactory.create(AppModule);
      const shutdownService = get(ShutdownService);

      // listen all SIGINT kernel signals
      process.on(TerminationSignal.SIGINT, async () => {
        await shutdownService.shutdown();
        exit(0);
      });

      // handle all SIGTERM kernel signals
      process.on(TerminationSignal.SIGTERM, async () => {
        await shutdownService.shutdown();
        exit(0);
      });

      // handle all SIGHUP kernel signals
      process.on(TerminationSignal.SIGHUP, async () => {
        await shutdownService.shutdown();
        exit(0);
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

      connectMicroservice<MicroserviceOptions>(grpcClientOptions);
      useGlobalPipes(new ValidationPipe({ whitelist: true }));
      useGlobalFilters(new ExceptionFilter());

      // start microservices and log necessary logs data
      await startAllMicroservices();
      await listen(ServicePort.AUTH);
      const url = await getUrl();

      this.logger.log(`Worker ${process.pid} started on URL| ${url}`);
    } catch (error) {
      this.logger.error(<Error>error);
      exit(0);
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

new App().start().then();
