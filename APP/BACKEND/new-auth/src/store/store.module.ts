import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthDatabase } from 'sdk';

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
  WorkExperience,
} from '@models';

import { UserStore } from './user.store';
import { BusinessRepository } from './business.service';

@Global()
@Module({
  providers: [UserStore, BusinessRepository],
  imports: [
    TypeOrmModule.forFeature(
      [
        User,
        Business,
        WorkExperience,
        Activities,
        License,
        Organization,
        Project,
        Skill,
        SkillEndorsement,
        UserSkills,
        Volunteering,
      ],
      AuthDatabase.MASTER,
    ),

    TypeOrmModule.forFeature(
      [
        User,
        Business,
        WorkExperience,
        Activities,
        License,
        Organization,
        Project,
        Skill,
        SkillEndorsement,
        UserSkills,
        Volunteering,
      ],
      AuthDatabase.SLAVE1,
    ),

    TypeOrmModule.forFeature(
      [
        User,
        Business,
        WorkExperience,
        Activities,
        License,
        Organization,
        Project,
        Skill,
        SkillEndorsement,
        UserSkills,
        Volunteering,
      ],
      AuthDatabase.SLAVE2,
    ),

    TypeOrmModule.forFeature(
      [
        User,
        Business,
        WorkExperience,
        Activities,
        License,
        Organization,
        Project,
        Skill,
        SkillEndorsement,
        UserSkills,
        Volunteering,
      ],
      AuthDatabase.SLAVE3,
    ),
  ],
  exports: [UserStore, BusinessRepository],
})
export class StoreModule {}
