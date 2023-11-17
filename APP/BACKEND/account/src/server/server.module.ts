import { Module } from '@nestjs/common';

import AppModule from '@app';

import { LogInController } from './login.controller';
import { SignInController } from './signin.controller';
import { AppController } from './app.controller';

@Module({
  imports: [AppModule],
  exports: [],
  providers: [],
  controllers: [AppController, LogInController, SignInController],
})
export class ServerModule {}
