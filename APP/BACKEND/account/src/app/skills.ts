import global from 'globals';

import { Injectable } from '@nestjs/common';
import { LoggerDecorator } from 'sdk';

import { SkillStore } from '@store';
import { Skill } from '@models';

@Injectable()
export class SkillsService {
  public constructor(private readonly skillStore: SkillStore) {}

  @LoggerDecorator(global.logger, __filename)
  public async get(): Promise<Skill> {
    const skill = await this.skillStore.getOne({});

    return skill;
  }
}
