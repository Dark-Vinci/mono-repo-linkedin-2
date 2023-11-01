import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger as WinstonLogger } from 'winston';

import { UserSkills } from '@models';
import { Undefinable } from '@types';

@Injectable()
export class UserSkillStore implements OnApplicationBootstrap {
  private globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(UserSkills) private readonly masterRepository: UserSkills,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    console.log({
      skill: this.masterRepository,
      logger: this.globalLogger,
    });
  }
}
