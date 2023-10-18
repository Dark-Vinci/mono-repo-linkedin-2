import global from 'globals';

import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import winston from 'winston';

import {
  AuthPingRequest,
  AuthPingResponse,
  AuthService,
  MyLogger as Logger,
  Type,
  Util,
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
  implements
    Pick<AuthService, MethodName.PING>,
    AppController,
    OnApplicationBootstrap
{
  private globalLogger: winston.Logger | any;

  constructor(
    private readonly appService: AppService,
    private readonly util: Util,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;
    console.log({ util: this.util });
  }

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
