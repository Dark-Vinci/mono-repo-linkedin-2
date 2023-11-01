import { Module } from '@nestjs/common';

import { SignUpService } from './signup.service';
import { SignInService } from './login.service';
import { AppServiceService } from './app.service';

@Module({
  imports: [],
  providers: [SignUpService, SignInService, AppServiceService],
  exports: [SignUpService, SignInService, AppServiceService],
})
export class AppServiceModule {}
