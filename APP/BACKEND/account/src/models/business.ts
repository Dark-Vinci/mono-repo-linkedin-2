import { Column, Entity, JoinTable, ManyToMany, Timestamp } from 'typeorm';

import { EntityNames, Ordering, Base, ColumnType } from 'sdk';

import { SCHEMA } from '@constants';
import { User } from './user';

class Following extends Base {
  follower_id!: string;

  business_id!: string;

  followers!: User[];

  following!: Business[];
}

@Entity({
  name: EntityNames.BUSINESSES,
  orderBy: { created_at: Ordering.DESC },
  synchronize: true,
  schema: SCHEMA,
})
export class Business extends Base {
  @Column({
    name: 'name',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public name!: string;

  @Column({
    name: 'founded_at',
    type: ColumnType.TIMESTAMP,
    nullable: false,
  })
  public foundedAt!: Date;

  @Column({
    name: 'overview',
    type: ColumnType.TEXT,
    nullable: false,
  })
  public overview!: string;

  @Column({
    name: 'website',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public website!: string;

  @Column({
    name: 'industry',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public industry!: string;

  @Column({
    name: 'headquaters',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public headquaters!: string;

  @Column({
    name: 'specialities',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public specialities!: string;

  @ManyToMany(() => User, (f) => f.createdBusinesses, {})
  @JoinTable()
  public founders!: User[];

  @ManyToMany(() => User, (f) => f.workAt, {})
  @JoinTable()
  public employees!: User[];
}
