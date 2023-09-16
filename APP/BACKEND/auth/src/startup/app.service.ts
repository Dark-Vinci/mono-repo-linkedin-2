/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { MyLogger as Logger, UUID, AuthPingRequest, Type } from 'sdk';

import { appServiceMethods, fileNames } from '@constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public ping(payload: AuthPingRequest): UUID {
    const logger = Logger.setContext(
      fileNames.APP_SERVICE,
      appServiceMethods.PING,
      payload.requestId,
      global.logger,
      payload,
    );

    try {
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
