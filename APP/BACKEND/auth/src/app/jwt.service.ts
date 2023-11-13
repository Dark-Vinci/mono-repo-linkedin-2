import global from 'globals';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoggerDecorator } from '@constants';

// let name = null;

// name ??= "default name";

@Injectable()
export class JwtAuthService {
  public constructor(private readonly jwtService: JwtService) {}

  @LoggerDecorator(global.logger)
  public async sign(payload: string): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {});

    return token;
  }

  @LoggerDecorator(global.logger, { run: () => Promise.resolve() })
  public async verify({ token }: decodePayload): Promise<boolean> {
    await this.jwtService.verifyAsync(token, {});

    return true;
  }

  @LoggerDecorator(global.logger)
  public decode({ token }: decodePayload): StringOrObject {
    const detail = this.jwtService.decode(token, {});

    return detail as StringOrObject;
  }
}

type StringOrObject = string | Record<string, object>;

type decodePayload = {
  requestId: string;
  token: string;
};
