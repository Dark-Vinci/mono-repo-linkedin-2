import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { EntityNames, Ordering, Base, ColumnType } from 'sdk';

import { SCHEMA } from '@constants';
import { User } from './user';

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

  @ManyToMany(() => User, (u) => u.createdBusinesses, {})
  @JoinTable()
  public founders!: User[];

  @ManyToMany(() => User, (u) => u.workAt, {})
  @JoinTable()
  public employees!: User[];

  // done
  @OneToMany(() => Follows, (f) => f.following)
  follows!: Follows[];
}

class Employment {
  businessId!: string;
  userId!: string;
}

@Entity({
  name: EntityNames.FOLLOWS,
  orderBy: { created_at: Ordering.DESC },
  synchronize: true,
  schema: SCHEMA,
})
export class Follows extends Base {
  @Column({
    name: 'user_id',
    type: ColumnType.UUID,
    nullable: false,
  })
  userId!: string;

  @Column({
    name: 'business_id',
    type: ColumnType.UUID,
    nullable: false,
  })
  businessId!: string;

  @ManyToOne(() => User, (u) => u.pages)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  followers!: User;

  @ManyToOne(() => Business, (u) => u.follows)
  @JoinColumn({
    name: 'business_id',
    referencedColumnName: 'id',
  })
  following!: Business;
}
