import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DOT_ENV_PATH } from 'sdk';

import { DB, RedisModule, RabbitMQ } from '@connections';
import { AppController, AppService, ShutdownService } from '.';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [DOT_ENV_PATH],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),

    // rabbitmq
    RabbitMQ,

    // redis
    RedisModule.registerAsync({
      useFactory: () => {
        return {} as any;
      },
      inject: [],
      imports: [],
    }),

    // typeorm
    DB.connect(),
  ],
  controllers: [AppController],
  providers: [AppService, ShutdownService],
})
export class AppModule {}
