import { Column, Entity } from 'typeorm';
import { EntityNames, Ordering, ColumnType, Base } from 'sdk';

import { SCHEMA } from '@constants';
import { User } from './user';

@Entity({
  name: EntityNames.VOLUNTEERING,
  synchronize: false,
  schema: SCHEMA,
  orderBy: { updated_at: Ordering.DESC },
})
export class Volunteering extends Base {
  public constructor(vol: Partial<Volunteering>) {
    super();
    Object.assign(this, vol);
  }

  @Column({
    name: 'title',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public title!: string;

  public user!: User;
}
