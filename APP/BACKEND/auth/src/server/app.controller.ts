import global from 'globals';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import winston from 'winston';

import {
  AuthPingRequest,
  AuthPingResponse,
  AuthService,
  MyLogger as Logger,
  Type,
} from 'sdk';

import {
  SERVICE_NAME,
  fileNames,
  appControllerMethods,
  MethodName,
} from '@constants';
import { AppService } from '@startup';

@Controller()
export class AppController
  implements Pick<AuthService, MethodName.PING>, AppController
{
  constructor(
    private readonly appService: AppService,
    private readonly globalLogger: winston.Logger = global.logger,
  ) {}

  @GrpcMethod(SERVICE_NAME, MethodName.PING)
  public async ping(payload: AuthPingRequest): Promise<AuthPingResponse> {
    const logger = Logger.setContext(
      fileNames.APP_SERVICE,
      appControllerMethods.PING,
      payload.requestId,
      this.globalLogger,
      payload,
    );

    logger.log('got a new ping request');

    const requestUUID = this.appService.ping(payload);

    logger.logPayload(
      { requestUUID: requestUUID.toJSON() },
      Type.RESPONSE_RESPONSE,
    );

    return { requestId: requestUUID.toString() };
  }
}
