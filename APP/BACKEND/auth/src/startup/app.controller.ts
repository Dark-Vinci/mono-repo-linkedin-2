import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  AuthPingRequest,
  AuthPingResponse,
  AuthService,
} from 'sdk/dist/grpc/auth';
import { MyLogger as Logger } from 'sdk/dist/helpers';

import { SERVICE_NAME, fileName } from '@constants';
import { AppService } from './app.service';

@Controller()
export class AppController implements AuthService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(SERVICE_NAME, MethodName.PING)
  public async ping(payload: AuthPingRequest): Promise<AuthPingResponse> {
    const logger = Logger.setContext(
      fileName,
      'AppController.ping',
      payload.requestId,
      global.logger,
    );

    logger.log('got a new ping request');

    const { requestId } = payload;
    const requestUUID = this.appService.ping(requestId);

    return { requestId: requestUUID.toString() };
  }
}
