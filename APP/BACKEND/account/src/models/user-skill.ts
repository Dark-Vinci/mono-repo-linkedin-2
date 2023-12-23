import { Column, Entity } from 'typeorm';
import { Ordering, UUID, EntityNames, Base, ColumnType } from 'sdk';

import { SCHEMA } from '@constants';

import { SkillEndorsement } from './skill-endorsement';
import { WorkExperience } from './experiences';
import { School } from './school';
import { Project } from './project';

@Entity({
  name: EntityNames.USER_SKILLS,
  synchronize: true,
  orderBy: { updatedAt: Ordering.DESC },
  schema: SCHEMA,
})
export class UserSkills extends Base {
  @Column({
    name: 'skill_id',
    type: ColumnType.UUID,
    nullable: false,
  })
  public skill_id!: string;

  @Column({
    name: 'user_id',
    type: ColumnType.UUID,
    nullable: false,
  })
  public user_id!: string;

  @Column({
    name: 'visible',
    type: ColumnType.VARCHAR,
    default: true,
  })
  public visible!: boolean;

  public experience!: WorkExperience[];
  public education!: School[];
  public project!: Project[];
  public endorser!: SkillEndorsement[];
}
