import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  AuthPingRequest,
  AuthPingResponse,
  AuthService,
} from 'sdk/dist/grpc/auth';
import { MyLogger as Logger } from 'sdk/dist/helpers';
import { Type } from 'sdk/dist/constants';

import {
  SERVICE_NAME,
  fileNames,
  appControllerMethods,
  MethodName,
} from '@constants';

import { AppService } from './app.service';

@Controller()
export class AppController implements AuthService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(SERVICE_NAME, MethodName.PING)
  public async ping(payload: AuthPingRequest): Promise<AuthPingResponse> {
    const logger = Logger.setContext(
      fileNames.APP_SERVICE,
      appControllerMethods.PING,
      payload.requestId,
      global.logger,
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
