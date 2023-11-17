import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger as WinstonLogger } from 'winston';

import { Skill } from '@models';
import { Repository } from 'typeorm';
// import { Undefinable } from '@types';

@Injectable()
export class SkillsStore implements OnApplicationBootstrap {
  private globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(Skill)
    private readonly masterRepository: Repository<Skill>,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    console.log({
      a: this.masterRepository,
      b: this.globalLogger,
    });
  }
}
