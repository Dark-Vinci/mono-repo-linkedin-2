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
} from 'sdk/dist/constants';

import { ShutdownService, AppModule } from '@startup';

class App {
  private readonly isDevMode = false;

  private readonly numCPUs = this.isDevMode ? 1 : cpus().length;

  private primaryWorker(): void {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < this.numCPUs; i++) {
      cluster.fork();
    }

    cluster.on(ClusterSignal.EXIT, (worker, code, signal) => {
      console.log({ code, signal });
      // for a new worker if this is not dev mode
      if (this.isDevMode) {
        cluster.fork();
      }
      console.log(`worker ${worker.process.pid} died`);
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
          package: ServiceName.ACCOUNT,
          gracefulShutdown: true,
          protoPath: <string[]>(<unknown>ServiceProtoPath.ACCOUNT),
          loader: GRPC_LOADER_OPTIONS,
        },
      };

      app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

      // start microservices and log necessary logs data
      await app.startAllMicroservices();
      await app.listen(ServicePort.ACCOUNT);
      const url = await app.getUrl();

      console.log(`Worker ${process.pid} started on URL| ${url}`);
    } catch (error) {
      console.log({ error });
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
