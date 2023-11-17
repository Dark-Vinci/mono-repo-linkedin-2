import global from 'globals';

import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';

import { SignInService } from '@app';
import { Undefinable } from '@types';

@Controller()
export class LogInController implements OnApplicationBootstrap {
  public globalLogger: Undefinable<WinstonLogger>;

  public constructor(private readonly signInService: SignInService) {}

  public onApplicationBootstrap(): void {
    this.globalLogger = global.logger;
    console.log({ a: this.signInService });
    console.log({ abc: this.signInService, b: this.globalLogger });
  }
}
