import global from 'globals';

import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { Injectable } from '@nestjs/common';
import winston from 'winston';

import { MyLogger as Logger } from 'sdk';

@Injectable()
export class MessagingProducer {
  public constructor(
    private readonly globalLogger: winston.Logger = global.logger,
  ) {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'subscribe-route',
    queue: 'subscribe-queue',
  })
  public async pubSubHandler(payload: object) {
    const logger = Logger.setContext(
      __filename,
      'pubSubHandler',
      'payload.requestId',
      this.globalLogger,
      payload,
    );

    logger.log('pub sub handler');
  }
}
