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
import { BusinessStore } from './business.store';
import { VolunteeringStore } from './volunteering.store';
import { UserSkillStore } from './user-skill.store';
import { LicenseStore } from './license.store';
import { ActivitiesStore } from './activities.store';
import { ProjectStore } from './project.store';
import { SkillsEndorsementStore } from './skills-endorsement.store';
import { WorkExperiencesStore } from './work-experiences';
import { CarrerBreakStore } from './career-break';

@Global()
@Module({
  providers: [
    UserStore,
    BusinessStore,
    VolunteeringStore,
    UserSkillStore,
    LicenseStore,
    ActivitiesStore,
    ProjectStore,
    SkillsEndorsementStore,
    WorkExperiencesStore,
    CarrerBreakStore,
  ],

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

  exports: [
    UserStore,
    BusinessStore,
    VolunteeringStore,
    UserSkillStore,
    LicenseStore,
    ActivitiesStore,
    ProjectStore,
    SkillsEndorsementStore,
    WorkExperiencesStore,
    CarrerBreakStore,
  ],
})
export class StoreModule {}
