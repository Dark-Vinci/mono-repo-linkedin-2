import global from 'globals';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger as WinstonLogger } from 'winston';

import { Project } from '@models';
import { Repository } from 'typeorm';
import { Undefinable } from '@types';

@Injectable()
export class ProjectStore implements OnApplicationBootstrap {
  public globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(Project)
    private readonly masterRepository: Repository<Project>,
  ) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    console.log({
      a: this.masterRepository,
    });
  }
}
