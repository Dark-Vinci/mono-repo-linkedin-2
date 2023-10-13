import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Business, User } from '@models';
import { UserRepository, BusinessRepository } from '.';

@Global()
@Module({
  providers: [UserRepository, BusinessRepository],
  imports: [TypeOrmModule.forFeature([User, Business])],
  exports: [UserRepository, BusinessRepository],
})
export class StoreModule {}
