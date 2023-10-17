import global from 'globals';

import { Business } from '@models';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import winston from 'winston';

import { UUID } from 'sdk';

@Injectable()
export class BusinessRepository implements OnApplicationBootstrap {
  public globalLogger: winston.Logger;

  public constructor(
    @InjectRepository(Business)
    private readonly _businessRepository: Repository<Business>,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;
  }

  public async createBusiness(
    _payload: Partial<Business>,
    _requestId: UUID,
  ): Promise<void> {
    console.log({ a: this._businessRepository, b: this.globalLogger! });
    return;
  }
}
