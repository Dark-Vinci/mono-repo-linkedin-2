import global from 'globals';

import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import winston from 'winston';

import { SignInService } from '@app';

@Controller()
export class LogInController implements OnApplicationBootstrap {
  private logger: winston.Logger | any;

  public constructor(private readonly signInService: SignInService) {}

  public onApplicationBootstrap(): void {
    this.logger = global.logger;
    console.log({ a: this.signInService });
    console.log({ abc: this.signInService, b: this.logger });
  }
}
