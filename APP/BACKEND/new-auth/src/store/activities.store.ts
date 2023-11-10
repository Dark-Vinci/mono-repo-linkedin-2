import global from 'globals';
import fs from 'fs/promises';

import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger as WinstonLogger } from 'winston';
import { Repository } from 'typeorm';

import { Undefinable } from 'sdk';

import { Activities } from '@models';

@Injectable()
export class ActivitiesStore implements OnApplicationBootstrap {
  public globalLogger: Undefinable<WinstonLogger>;

  public constructor(
    @InjectRepository(Activities)
    private readonly masterRepository: Repository<Activities>,
  ) {}

  public async onApplicationBootstrap(): void {
    this.globalLogger = global.logger;

    await using a = await fs.open('./')
    a.createReadStream();

    console.log({
      a: this.globalLogger,
      b: this.masterRepository,
    });
  }
}
