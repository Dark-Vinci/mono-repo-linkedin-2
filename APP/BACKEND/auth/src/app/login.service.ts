import global from 'globals';

import { Injectable } from '@nestjs/common';
import winston from 'winston';

import { JwtAuthService } from './jwt.service';

@Injectable()
export class SignInService {
  private logger: winston.Logger | any;

  public constructor(private readonly jwtAuthService: JwtAuthService) {}

  public onApplicationBootstrap(): void {
    this.logger = global.logger;
    console.log({ a: this.logger, b: this.jwtAuthService });
  }
}
