import { Module } from '@nestjs/common';

import { LogInController } from './login.controller';
import { SignInController } from './signin.controller';
import { AppController } from './app.controller';

@Module({
  imports: [],
  exports: [],
  providers: [],
  controllers: [AppController, LogInController, SignInController],
})
export class ServerModule {}
