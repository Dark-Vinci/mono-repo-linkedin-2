import { Module } from '@nestjs/common';

import { AppController, SignInController, LogInController } from '.';

@Module({
  imports: [],
  exports: [],
  providers: [],
  controllers: [AppController, LogInController, SignInController],
})
export class ServerModule {}
