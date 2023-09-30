import global from 'globals';

import winston from 'winston';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { MyLogger as Logger, UUID, AuthPingRequest, Type } from 'sdk';

import { appServiceMethods, fileNames } from '@constants';

@Injectable()
export class AppService {
  constructor(private readonly globalLogger: winston.Logger = global.logger) {}

  getHello(): string {
    return 'Hello World!';
  }

  public ping(payload: AuthPingRequest): UUID {
    const logger = Logger.setContext(
      fileNames.APP_SERVICE,
      appServiceMethods.PING,
      payload.requestId,
      this.globalLogger,
      payload,
    );

    try {
      // assert(2 == 2, 'something is entirely wrong');
      const { requestId } = payload;

      const response = UUID.parse(requestId);

      logger.logPayload(
        { response: response.toJSON() },
        Type.RESPONSE_RESPONSE,
      );

      return UUID.parse(requestId);
    } catch (error) {
      logger.error(error);
      throw new RpcException(error.message);
    }
  }
}
