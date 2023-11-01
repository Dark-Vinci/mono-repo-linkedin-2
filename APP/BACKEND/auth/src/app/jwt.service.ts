import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { JwtService } from '@nestjs/jwt';

import { MyLogger as Logger } from 'sdk';
import { Undefinable } from '@types';

enum JWTServiceMethod {
  SIGN = 'JwtAuthService.sign',
  VERIFY = 'JwtAuthService.verify',
  DECODE = 'JwtAuthService.decode',
}

@Injectable()
export class JwtAuthService implements OnApplicationBootstrap {
  private logger: Undefinable<WinstonLogger>;

  public onApplicationBootstrap(): void {
    this.logger = global.logger;
    return;
  }

  public constructor(private readonly jwtService: JwtService) {}

  public async sign({
    requestId,
    payload,
  }: {
    requestId: string;
    payload: object;
  }): Promise<string> {
    const logger = Logger.setContext(
      __filename,
      JWTServiceMethod.SIGN,
      requestId,
      this.logger!,
      payload,
    );

    try {
      const token = await this.jwtService.signAsync(payload, {});

      return token;
    } catch (error) {
      logger.error(<Error>error);
      throw error;
    }
  }

  public async verify({
    token,
    requestId,
  }: {
    token: string;
    requestId: string;
  }): Promise<boolean> {
    const logger = Logger.setContext(
      __filename,
      JWTServiceMethod.VERIFY,
      requestId,
      this.logger!,
      {
        token,
      },
    );

    try {
      await this.jwtService.verifyAsync(token, {});

      return true;
    } catch (error) {
      logger.error(<Error>error);
      throw error;
    }
  }

  public decode({
    token,
    requestId,
  }: {
    token: string;
    requestId: string;
  }): string | Record<string, object> {
    const logger = Logger.setContext(
      __filename,
      JWTServiceMethod.DECODE,
      requestId,
      this.logger!,
      {
        token,
      },
    );

    try {
      const detail = this.jwtService.decode(token, {});

      return detail as string | Record<string, object>;
    } catch (error) {
      logger.error(<Error>error);
      throw error;
    }
  }
}
