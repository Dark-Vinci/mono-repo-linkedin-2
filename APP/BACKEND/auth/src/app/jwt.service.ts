import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import winston from 'winston';
import { JwtService } from '@nestjs/jwt';

import { MyLogger as Logger } from 'sdk';

@Injectable()
export class JwtAuthService implements OnApplicationBootstrap {
  private logger: winston.Logger | any;

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
    payload: any;
  }): Promise<string> {
    const logger = Logger.setContext(__filename, '', requestId, this.logger);

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
    const logger = Logger.setContext(__filename, '', requestId, this.logger);

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
  }): string | Record<string, any> {
    const logger = Logger.setContext(__filename, '', requestId, this.logger);

    try {
      const detail = this.jwtService.decode(token, {});

      return detail as string | Record<string, any>;
    } catch (error) {
      logger.error(<Error>error);
      throw error;
    }
  }
}
