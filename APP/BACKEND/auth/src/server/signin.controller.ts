import global from 'globals';

import { Controller, OnApplicationBootstrap } from '@nestjs/common';
import winston from 'winston';

import { SignInService } from '@app';

@Controller()
export class SignInController implements OnApplicationBootstrap {
  private logger: winston.Logger | any;

  public constructor(private readonly signInService: SignInService) {}

  public onApplicationBootstrap(): void {
    this.logger = global.logger;
  }
}
