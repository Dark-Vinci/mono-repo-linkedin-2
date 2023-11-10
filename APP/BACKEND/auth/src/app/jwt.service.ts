import global from 'globals';

import { Injectable } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { JwtService } from '@nestjs/jwt';

import { MyLogger as Logger } from 'sdk';
import { Undefinable } from '@types';

// enum JWTServiceMethod {
//   SIGN = 'JwtAuthService.sign',
//   VERIFY = 'JwtAuthService.verify',
//   DECODE = 'JwtAuthService.decode',
// }

@Injectable()
export class JwtAuthService {
  // private logger: Undefinable<WinstonLogger>;

  // public onApplicationBootstrap(): void {
  //   this.logger = global.logger;
  //   return;
  // }

  public constructor(private readonly jwtService: JwtService) {}

  public async sign({
    payload,
  }: {
    requestId: string;
    payload: object;
  }): Promise<string> {
    // const logger = Logger.setContext(
    //   __filename,
    //   JWTServiceMethod.SIGN,
    //   requestId,
    //   this.logger!,
    //   payload,
    // );

    try {
      const token = await this.jwtService.signAsync(payload, {});

      return token;
    } catch (error) {
      // logger.error(<Error>error);
      throw error;
    }
  }

  public async verify({
    token,
  }: {
    token: string;
    requestId: string;
  }): Promise<boolean> {
    // const logger = Logger.setContext(
    //   __filename,
    //   JWTServiceMethod.VERIFY,
    //   requestId,
    //   this.logger!,
    //   {
    //     token,
    //   },
    // );

    try {
      await this.jwtService.verifyAsync(token, {});

      return true;
    } catch (error) {
      // logger.error(<Error>error);
      throw error;
    }
  }

  @LoggerDecorator(global.logger)
  public decode({ token }: decodePayload, logger?: Logger): StringOrObject {
    try {
      const detail = this.jwtService.decode(token, {});

      return detail as StringOrObject;
    } catch (error) {
      logger!.error(<Error>error);
      throw error;
    }
  }
}

type StringOrObject = string | Record<string, object>;

type decodePayload = {
  requestId: string;
  token: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LoggerDecorator(logger: Undefinable<WinstonLogger>): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, context: any): any {
    if (context.kind == 'method') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return function (this: any, ...args: any[]): any {
        const methodLogger = Logger.setContext(
          __filename,
          context.name,
          args[0].requestId,
          logger!,
          { payload: args[0] },
        );

        const response = target.apply(this, [...args, methodLogger]);

        methodLogger.log(JSON.stringify(response));

        return response;
      };
    }
  };
}
