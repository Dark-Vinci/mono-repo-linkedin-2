import { NestFactory } from '@nestjs/core';
import { AppModule } from './startup/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap().then();
