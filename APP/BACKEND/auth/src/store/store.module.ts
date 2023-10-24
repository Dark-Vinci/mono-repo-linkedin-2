import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Business, User } from '@models';
import { UserRepository } from './user.service';
import { BusinessRepository } from './business.service';

@Global()
@Module({
  providers: [UserRepository, BusinessRepository],
  imports: [TypeOrmModule.forFeature([User, Business])],
  exports: [UserRepository, BusinessRepository],
})
export class StoreModule { }
