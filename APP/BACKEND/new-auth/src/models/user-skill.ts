import { Entity } from 'typeorm';

import { UUID } from 'sdk';

import { EntityNames, Ordering } from '@types';
import { SCHEMA } from '@constants';

import { SkillEndorsement } from './skill-endorsement';
import { Base } from './base';

@Entity({
  name: EntityNames.USER_SKILLS,
  synchronize: true,
  orderBy: { updatedAt: Ordering.DESC },
  schema: SCHEMA,
})
export class UserSkills extends Base {
  public skill_id!: UUID;
  public user_id!: UUID;

  public endorser!: SkillEndorsement[];
}
