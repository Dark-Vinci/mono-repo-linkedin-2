/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { MyLogger as Logger, UUID } from 'sdk/dist/helpers';
import { AuthPingRequest } from 'sdk/dist/grpc/auth';
import { Type } from 'sdk/dist/constants';

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
      throw new RpcException(new NotFoundException(error.message));
    }
  }
}
