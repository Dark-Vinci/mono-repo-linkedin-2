import global from 'globals';

import { Business } from '@models';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import winston from 'winston';

import { Util, UUID } from 'sdk';

@Injectable()
export class BusinessRepository implements OnApplicationBootstrap {
  public globalLogger: winston.Logger | any;

  public constructor(
    @InjectRepository(Business)
    private readonly _businessRepository: Repository<Business>,
    private readonly util: Util,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;
  }

  public async createBusiness(
    _payload: Partial<Business>,
    _requestId: UUID,
  ): Promise<void> {
    console.log({
      a: this._businessRepository,
      b: this.globalLogger,
      c: this.util,
    });
    return;
  }
}
