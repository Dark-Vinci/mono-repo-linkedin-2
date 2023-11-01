import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Activities,
  Business,
  License,
  Organization,
  Project,
  Skill,
  User,
  Volunteering,
  UserSkills,
  SkillEndorsement,
  Experiences,
} from '@models';
import { UserRepository } from './user.service';
import { BusinessRepository } from './business.service';

@Global()
@Module({
  providers: [UserRepository, BusinessRepository],
  imports: [
    TypeOrmModule.forFeature([
      User,
      Business,
      Experiences,
      Activities,
      License,
      Organization,
      Project,
      Skill,
      SkillEndorsement,
      UserSkills,
      Volunteering,
    ]),
  ],
  exports: [UserRepository, BusinessRepository],
})
export class StoreModule {}
