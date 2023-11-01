import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger as WinstonLogger } from 'winston';

import { License } from '@models';
import { Repository } from 'typeorm';
import { Undefinable } from '@types';

@Injectable()
export class LicenseStore implements OnApplicationBootstrap {
  private globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(License)
    private readonly masterRepository: Repository<License>,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    console.log({
      a: this.masterRepository,
      b: this.globalLogger,
    });
  }
}
