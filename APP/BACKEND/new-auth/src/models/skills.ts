import { Column, Entity, Index } from 'typeorm';

import { EntityNames, Ordering, ColumnType } from 'sdk';

import { SCHEMA } from '@constants';

import { Base } from './base';

@Entity({
  name: EntityNames.SKILLS,
  synchronize: false,
  schema: SCHEMA,
  orderBy: { updated_at: Ordering.DESC },
})
export class Skill extends Base {
  public constructor(skl: Partial<Skill>) {
    super();
    Object.assign(this, skl);
  }

  @Column({
    name: 'name',
    type: ColumnType.VARCHAR,
  })
  @Index({ unique: true })
  public name!: string;
}
