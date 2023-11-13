import { Column, Entity } from 'typeorm';

import { ColumnType, MediaFor, Nullable, Ordering } from 'sdk';

import { SCHEMA } from '@constants';

import { Base } from './base';

@Entity({
  name: '',
  schema: SCHEMA,
  orderBy: { upddatedAt: Ordering.DESC },
  synchronize: false,
})
export class Media extends Base {
  @Column({
    name: 'url',
    nullable: false,
    type: ColumnType.TEXT,
  })
  public url!: string;

  @Column({
    name: 'url_for',
    enum: MediaFor,
    nullable: false,
  })
  public urlFor!: MediaFor;

  @Column({
    name: 'user_id',
    nullable: true,
    type: ColumnType.VARCHAR,
  })
  public userId!: Nullable<string>;

  @Column({
    name: 'school_id',
    nullable: true,
    type: ColumnType.VARCHAR,
  })
  public schoolId!: Nullable<string>;
}
