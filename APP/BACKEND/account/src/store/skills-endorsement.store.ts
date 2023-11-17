import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SkillEndorsement } from '@models';
import { Undefinable } from '@types';

Injectable();
export class SkillsEndorsementStore implements OnApplicationBootstrap {
  private globalLogger: Undefinable<SkillEndorsement>;

  public constructor(
    @InjectRepository(SkillEndorsement)
    private readonly masterRepository: Repository<SkillEndorsement>,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    console.log({
      a: this.globalLogger,
      b: this.masterRepository,
    });
  }
}
