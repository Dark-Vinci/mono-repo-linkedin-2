import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { configInterface } from 'sdk';

import StoreModule from '@store';
import {
  JWT_EXPIRES_IN,
  JWT_ISSUER,
  JWT_NOT_BEFORE,
  JWT_SECRET,
} from '@constants';

import { SignUpService } from './signup';
import { SignInService } from './login';
import { AppServiceService } from './app';

@Module({
  imports: [
    StoreModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],

      useFactory: (config: ConfigService<configInterface>) => {
        const get = config.get;

        const jwtOptions: JwtModuleOptions = {
          secret: get(JWT_SECRET)!,
          signOptions: {
            expiresIn: get(JWT_EXPIRES_IN)!,
            issuer: get(JWT_ISSUER)!,
            notBefore: get(JWT_NOT_BEFORE)!,
          },
        };

        return jwtOptions;
      },
    }),
  ],
  providers: [SignUpService, SignInService, AppServiceService],
  exports: [SignUpService, SignInService, AppServiceService],
})
export class AppServiceModule { }
