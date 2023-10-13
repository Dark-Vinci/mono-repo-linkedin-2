import { BeforeInsert, Column, Entity } from 'typeorm';

import { EMPTY_STRING, SCHEMA } from '@constants';
import { ColumType, EntityNames, Ordering } from '@types';
import { Base } from '.';

@Entity({
  name: EntityNames.USER,
  orderBy: { created_at: Ordering.ASC },
  synchronize: true,
  schema: SCHEMA,
})
export class User extends Base {
  public constructor(payload: Partial<User>) {
    super();

    const { firstName, lastName, password, email } = payload;

    this.email = email || EMPTY_STRING;
    this.password = password || EMPTY_STRING;
    this.lastName = lastName || EMPTY_STRING;
    this.firstName = firstName || EMPTY_STRING;
  }

  @Column({
    type: ColumType.VARCHAR,
    name: 'first_name',
    nullable: false,
  })
  firstName!: string;

  @Column({
    type: ColumType.VARCHAR,
    name: 'first_name',
    nullable: false,
  })
  lastName!: string;

  @Column({
    type: ColumType.VARCHAR,
    name: 'password',
    nullable: false,
  })
  password!: string;

  @Column({
    type: ColumType.VARCHAR,
    name: 'email',
    nullable: false,
  })
  email!: string;

  @BeforeInsert()
  public hashPassword(): Promise<void> {
    return Promise.resolve();
  }
}
