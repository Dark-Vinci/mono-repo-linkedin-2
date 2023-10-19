import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { configInterface } from '@types';
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_ISSUER,
  JWT_NOT_BEFORE,
} from '@constants';

import { SignUpService } from './signup.service';
import { SignInService } from './login.service';
import { AppServiceService } from './app.service';
import { JwtAuthService } from './jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],

      useFactory: (config: ConfigService<configInterface>) => {
        const get = config.get;

        const jwtOptions: JwtModuleOptions = {
          secret: get(JWT_SECRET) as string,
          signOptions: {
            expiresIn: get(JWT_EXPIRES_IN) as string,
            issuer: get(JWT_ISSUER) as string,
            notBefore: get(JWT_NOT_BEFORE) as string,
          },
        };

        return jwtOptions;
      },
    }),
  ],
  providers: [SignUpService, SignInService, AppServiceService, JwtAuthService],
  exports: [SignUpService, SignInService, AppServiceService],
})
export class AppServiceModule {}
