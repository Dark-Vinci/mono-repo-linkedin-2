import { Column, Entity } from 'typeorm';

import { ColumnType, EntityNames, Ordering, Base } from 'sdk';

import { SCHEMA } from '@constants';

import { User } from './user';

@Entity({
  name: EntityNames.SCHOOLS,
  synchronize: false,
  schema: SCHEMA,
  orderBy: { updated_at: Ordering.DESC },
})
export class School extends Base {
  public constructor(sch: Partial<School>) {
    super();
    Object.assign(this, sch);
  }

  @Column({
    name: 'name',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public name!: string;

  public students!: User[];
}
