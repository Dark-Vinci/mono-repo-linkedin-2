import { Module } from '@nestjs/common';

import { SignUpService } from './signup.service';
import { SignInService } from './login.service';
import { AppServiceService } from './app.service';

@Module({
  providers: [SignUpService, SignInService, AppServiceService],
  exports: [SignUpService, SignInService, AppServiceService],
  imports: [],
})
export class AppServiceModule {}
