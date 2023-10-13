import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@models';
import { UserRepository } from '.';

@Module({
  providers: [UserRepository],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserRepository],
})
export class StoreModule {}
