import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import winston from 'winston';

import { RedisClient } from '@connections';

import { JwtAuthService } from './jwt.service';

@Injectable()
export class SignUpService implements OnApplicationBootstrap {
  private logger: winston.Logger | any;

  public constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly redis: RedisClient,
  ) {}

  public onApplicationBootstrap(): void {
    this.logger = global.logger;
    console.log({ a: this.logger, b: this.jwtAuthService, c: this.redis });
  }
}
