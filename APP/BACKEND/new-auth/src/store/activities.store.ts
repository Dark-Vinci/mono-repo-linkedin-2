import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger as WinstonLogger } from 'winston';

import { Activities } from '@models';
import { Repository } from 'typeorm';
import { Undefinable } from '@types';

@Injectable()
export class ActivitiesStore implements OnApplicationBootstrap {
  public globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(Activities)
    private readonly masterRepository: Repository<Activities>,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    console.log({
      a: this.globalLogger,
      b: this.masterRepository,
    });
  }
}
