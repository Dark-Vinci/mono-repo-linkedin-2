import global from 'globals';

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

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

import { AppService } from './app.service';

@Controller()
export class AppController implements AuthService {
  private readonly globalLogger = global.logger;

  constructor(private readonly appService: AppService) {}

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
