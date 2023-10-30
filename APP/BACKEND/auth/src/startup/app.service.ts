import global from 'globals';

import { Logger as WinstonLogger } from 'winston';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { MyLogger as Logger, UUID, AuthPingRequest, Type, Util } from 'sdk';

import { appServiceMethods, fileNames } from '@constants';
import { Undefinable } from '@types';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private globalLogger: Undefinable<WinstonLogger>;

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;
  }

  public constructor(private readonly util: Util) {}

  getHello(): string {
    return 'Hello World!';
  }

  public ping(payload: AuthPingRequest): UUID {
    const { globalLogger, util } = this;
    const logger = Logger.setContext(
      fileNames.APP_SERVICE,
      appServiceMethods.PING,
      payload.requestId,
      globalLogger!,
      payload,
    );

    try {
      util.assert(2 == 2, 'something is entirely wrong');

      const { requestId } = payload;

      const response = UUID.parse(requestId);

      logger.logPayload(
        { response: response.toJSON() },
        Type.RESPONSE_RESPONSE,
      );

      return UUID.parse(requestId);
    } catch (error) {
      logger.error(<Error>error);
      throw new RpcException((<Error>error).message);
    }
  }
}
