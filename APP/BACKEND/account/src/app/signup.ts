import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';

import { RedisClient } from '@connections';
import { Undefinable } from 'sdk';

@Injectable()
export class SignUpService implements OnApplicationBootstrap {
  private logger: Undefinable<WinstonLogger>;

  public constructor(private readonly redis: RedisClient) {}

  public onApplicationBootstrap(): void {
    this.logger = global.logger;
    console.log({ a: this.logger, c: this.redis });
  }
}
