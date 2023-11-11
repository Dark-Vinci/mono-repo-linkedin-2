import global from 'globals';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { MyLogger as Logger } from 'sdk';

import { LoggerDecorator } from '@constants';

@Injectable()
export class JwtAuthService {
  public constructor(private readonly jwtService: JwtService) {}

  @LoggerDecorator(global.logger)
  public async sign(payload: string, logger?: Logger): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payload, {});

      return token;
    } catch (error) {
      logger!.error(<Error>error);
      throw error;
    }
  }

  @LoggerDecorator(global.logger)
  public async verify(
    { token }: decodePayload,
    logger?: Logger,
  ): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token, {});

      return true;
    } catch (error) {
      logger!.error(<Error>error);
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
