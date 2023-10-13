import global from 'globals';

import { Business } from '@models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import winston from 'winston';

import { UUID } from 'sdk';

@Injectable()
export class BusinessRepository {
  public constructor(
    @InjectRepository(Business)
    private readonly _businessRepository: Repository<Business>,
    private readonly _globalLogger: winston.Logger = global.logger,
  ) {}

  public async createBusiness(
    _payload: Partial<Business>,
    _requestId: UUID,
  ): Promise<void> {
    return;
  }
}
