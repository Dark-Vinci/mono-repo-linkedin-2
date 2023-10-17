import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { DB, RedisModule, RabbitMQ } from '@connections';
// import { StoreModule } from '@store';
// import { ServerModule } from '@server';
import { DBConfig } from '@config';
import { AppService } from './app.service';
import { ShutdownService } from './app.shutdown.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: [DOT_ENV_PATH]
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [DBConfig],
    }),

    // // rabbitmq
    // RabbitMQ,
    //
    // // redis
    // RedisModule.registerAsync({
    //   useFactory: () => {
    //     return {} as any;
    //   },
    //   inject: [],
    //   imports: [],
    // }),
    //
    // // typeorm
    // DB.connect(),
    //
    // // store
    // StoreModule,
    //
    // // Server module
    // ServerModule,
  ],
  providers: [AppService, ShutdownService],
})
export class AppModule {}
