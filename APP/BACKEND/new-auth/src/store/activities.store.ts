import global from 'globals';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger as WinstonLogger } from 'winston';
import { Repository } from 'typeorm';

import { LoggerDecorator, Undefinable } from 'sdk';

import { Activities, User } from '@models';

@Injectable()
export class ActivitiesStore {
  public globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(Activities)
    private readonly masterRepository: Repository<Activities>,
  ) {}

  @LoggerDecorator(global.logger, __filename)
  public async createUser(): Promise<Activities> {
    this.globalLogger = global.logger;

    return new Activities();
  }
}
