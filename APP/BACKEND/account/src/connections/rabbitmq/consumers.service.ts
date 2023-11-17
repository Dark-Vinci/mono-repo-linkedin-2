import global from 'globals';

import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { Injectable } from '@nestjs/common';
import winston from 'winston';

import { MyLogger as Logger } from 'sdk';

enum MessagingSubscriberMethods {
  COMPETING_PUB_SUB_HANDLER = 'MessagingSubscriber.competingPubSubHandler',
}

@Injectable()
export class MessagingSubscriber {
  public constructor(
    private readonly globalLogger: winston.Logger = global.logger,
  ) {}

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'subscribe-route1',
    queue: 'subscribe-queue',
  })
  public async competingPubSubHandler(payload: object): Promise<void> {
    const logger = Logger.setContext(
      __filename,
      MessagingSubscriberMethods.COMPETING_PUB_SUB_HANDLER,
      'payload.requestId',
      this.globalLogger,
      payload,
    );

    logger.log('pub sub handler');
  }
}
