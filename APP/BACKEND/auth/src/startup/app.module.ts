import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShutdownService } from './app.shutdown.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ShutdownService],
})
export class AppModule {}
