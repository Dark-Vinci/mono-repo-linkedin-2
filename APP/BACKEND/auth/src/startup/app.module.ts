import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DOT_ENV_PATH } from 'sdk';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShutdownService } from './app.shutdown.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [DOT_ENV_PATH],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),

    // redis

    // typeorm
  ],
  controllers: [AppController],
  providers: [AppService, ShutdownService],
})
export class AppModule {}
