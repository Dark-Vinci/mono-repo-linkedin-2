import { Module } from '@nestjs/common';

import AppModule from '@app';

import { LogInController } from './login';
import { SignInController } from './signin';
import { AppController } from './app';

@Module({
  imports: [AppModule],
  exports: [],
  providers: [],
  controllers: [AppController, LogInController, SignInController],
})
export class ServerModule {}
