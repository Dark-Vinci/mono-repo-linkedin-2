import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger as WinstonLogger } from 'winston';

import { Undefinable } from 'sdk';

import { Experiences } from '@models';
import { Repository } from 'typeorm';

@Injectable()
export class ExperiencesStore implements OnApplicationBootstrap {
  private globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(Experiences)
    private readonly masterRepository: Repository<Experiences>,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    console.log({
      a: this.masterRepository,
      b: this.globalLogger,
    });
  }
}
