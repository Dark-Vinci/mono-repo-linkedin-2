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

// @Entity({
//   name: EntityNames.FOLLOWS,
//   orderBy: { created_at: Ordering.DESC },
//   synchronize: true,
//   schema: SCHEMA,
// })
// export class Follows extends Base {
//   @Column({
//     name: 'follower_id',
//     type: ColumnType.UUID,
//     nullable: false,
//   })
//   followerId!: string;

//   @Column({
//     name: 'business_id',
//     type: ColumnType.UUID,
//     nullable: false,
//   })
//   businessId!: string;

//   @ManyToOne(() => Business, (b) => b.follows)
//   @JoinColumn({
//     name: 'business_id',
//     referencedColumnName: 'id',
//   })
//   followers!: Business;

//   @ManyToOne(() => User, (u) => u.pages)
//   @JoinColumn({
//     name: 'follower_id',
//     referencedColumnName: 'id',
//   })
//   following!: User;
// }

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

  @OneToMany(() => Follows, (f) => f.following)
  follows!: Follows[];
}

@Entity({
  name: EntityNames.FOLLOWS,
  orderBy: { created_at: Ordering.DESC },
  synchronize: true,
  schema: SCHEMA,
})
export class Follows extends Base {
  @Column({
    name: 'follower_id',
    type: ColumnType.UUID,
    nullable: false,
  })
  followerId!: string;

  @Column({
    name: 'business_id',
    type: ColumnType.UUID,
    nullable: false,
  })
  businessId!: string;

  @ManyToOne(() => Business, (b) => b.follows)
  @JoinColumn({
    name: 'business_id',
    referencedColumnName: 'id',
  })
  followers!: Business;

  @ManyToOne(() => User, (u) => u.pages)
  @JoinColumn({
    name: 'follower_id',
    referencedColumnName: 'id',
  })
  following!: User;
}
