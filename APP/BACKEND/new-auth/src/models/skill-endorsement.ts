import { Column, Entity, JoinColumn } from 'typeorm';

import { UUID } from 'sdk';

import { ColumnType, EntityNames, Ordering } from '@types';
import { SCHEMA } from '@constants';

import { Skill } from './skills';
import { User } from './user';
import { Base } from './base';

type OrString<T> = T | string;

@Entity({
  name: EntityNames.SKILL_ENDORSEMENTS,
  synchronize: false,
  orderBy: { updatedAt: Ordering.DESC },
  schema: SCHEMA,
})
export class SkillEndorsement extends Base {
  @Column({
    name: 'skill_id',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public skillId!: OrString<UUID>;

  @Column({
    name: 'user_id',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public userId!: UUID;

  @Column({
    name: 'endorser_id',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public endorserId!: UUID;

  @JoinColumn({
    name: 'skill_id',
    referencedColumnName: 'id',
  })
  public skill!: Skill;

  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  public user!: User;

  @JoinColumn({
    name: 'endorser_id',
    referencedColumnName: 'id',
  })
  public endorsedBy!: User;
}
