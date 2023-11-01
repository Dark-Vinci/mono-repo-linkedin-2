import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Logger as WinstonLogger } from 'winston';

import { Volunteering } from '@models';
import { InjectRepository } from '@nestjs/typeorm';
import { Undefinable } from '@types';

@Injectable()
export class VolunteeringStore implements OnApplicationBootstrap {
  private globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(Volunteering)
    private readonly masterRepository: Repository<Volunteering>,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    console.log({
      logger: this.globalLogger,
      master: this.masterRepository,
    });
  }
}
