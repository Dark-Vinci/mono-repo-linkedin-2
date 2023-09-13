import { Injectable } from '@nestjs/common';

import { MyLogger as Logger, UUID } from 'sdk/dist/helpers';
import { AuthPingRequest } from 'sdk/dist/grpc/auth';

import { appServiceMethods, fileNames } from '@constants';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public ping(payload: AuthPingRequest): UUID {
    const _logger = Logger.setContext(
      fileNames.APP_SERVICE,
      appServiceMethods.PING,
      payload.requestId,
      global.logger,
      payload,
    );

    const { requestId } = payload;

    return UUID.parse(requestId);
  }
}
