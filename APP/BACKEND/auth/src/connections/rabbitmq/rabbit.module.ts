import global from 'globals';

import { Module, OnModuleInit } from '@nestjs/common';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import winston from 'winston';

import { MyLogger as Logger, UUID } from 'sdk';

import { appServiceMethods, fileNames } from '@constants';
import { MessagingProducer, MessagingSubscriber } from '.';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: '',
      exchanges: [
        {
          name: '',
          type: '',
        },
      ],
    }),
  ],
  exports: [MessagingProducer, MessagingSubscriber],
  providers: [MessagingProducer, MessagingSubscriber],
})
export class RabbitMQ implements OnModuleInit {
  public constructor(
    private readonly globalLogger: winston.Logger = global.logger,
  ) {}

  public onModuleInit(): void {
    const logger = Logger.setContext(
      fileNames.APP_SERVICE,
      appServiceMethods.PING,
      UUID.nil().toString(),
      this.globalLogger,
      {},
    );

    logger.log('rabbit mq has been connected to');
  }
}
