import global from 'globals';

import { Business } from '@models';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';

import { Util, UUID } from 'sdk';

import { Undefinable } from '@types';

@Injectable()
export class BusinessRepository implements OnApplicationBootstrap {
  public globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(Business)
    private readonly _businessRepository: Repository<Business>,
    private readonly util: Util,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;
  }

  public async _createBusiness(
    _payload: Partial<Business>,
    _requestId: UUID,
  ): Promise<void> {
    console.log({
      a: this._businessRepository,
      b: this.globalLogger,
      c: this.util,
      d: _payload,
      e: _requestId,
    });
    return;
  }
}
