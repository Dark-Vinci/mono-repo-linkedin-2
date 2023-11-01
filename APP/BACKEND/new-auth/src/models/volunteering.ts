import { Column, Entity } from 'typeorm';

import { ColumnType, EntityNames, Ordering } from '@types';
import { SCHEMA } from '@constants';

import { Base } from './base';

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
}
