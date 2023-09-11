import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  AuthPingRequest,
  AuthPingResponse,
  AuthService,
} from 'sdk/dist/grpc/auth';

import { AppService } from './app.service';

const SERVICE_NAME = 'Auth' as const;

enum MethodName {
  PING = 'ping',
}

@Controller()
export class AppController implements AuthService {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(SERVICE_NAME, MethodName.PING)
  public async ping(payload: AuthPingRequest): Promise<AuthPingResponse> {
    const { requestId } = payload;
    const requestUUID = this.appService.ping(requestId);

    return { requestId: requestUUID.toString() };
  }
}
