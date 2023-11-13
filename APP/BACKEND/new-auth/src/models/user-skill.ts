import { Entity } from 'typeorm';

import { Ordering, UUID, EntityNames } from 'sdk';

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
