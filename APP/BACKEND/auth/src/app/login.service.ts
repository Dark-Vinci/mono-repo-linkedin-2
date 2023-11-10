import global from 'globals';

import { Injectable } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';

import { RedisClient } from '@connections';
import { Undefinable } from '@types';

import { JwtAuthService } from './jwt.service';

@Injectable()
export class SignInService {
  private logger: Undefinable<WinstonLogger>;

  public constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly redis: RedisClient,
  ) {}

  public onApplicationBootstrap(): void {
    this.jwtAuthService.decode({ token: 'a', requestId: 'abc' });
    this.logger = global.logger;
    console.log({ a: this.logger, b: this.jwtAuthService, c: this.redis });
  }
}
