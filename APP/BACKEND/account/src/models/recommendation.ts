import { Column, Entity } from 'typeorm';

import { SCHEMA } from '@constants';
import { Base, ColumnType, EntityNames, Ordering } from 'sdk';

import { User } from './user';

@Entity({
  name: EntityNames.RECOMMENDATION,
  schema: SCHEMA,
  orderBy: { updatedAt: Ordering.DESC },
  synchronize: false,
})
export class Recommendation extends Base {
  public constructor(proj: Partial<Recommendation>) {
    super();
    Object.assign(this, proj);
  }

  @Column({
    type: ColumnType.BOOLEAN,
    name: 'out',
    nullable: false,
    default: true,
  })
  public out!: boolean;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'content',
    nullable: false,
  })
  public content!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'from_user_id',
    nullable: false,
  })
  public fromUserId!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'to_user_id',
    nullable: false,
  })
  public toUserId!: string;

  // @
  public fromUser!: User;

  public toUser!: User;
}
