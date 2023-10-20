import { BeforeInsert, Column, Entity } from 'typeorm';

import { Hasher } from 'sdk';

import { SCHEMA } from '@constants';
import { ColumnType, EntityNames, Ordering } from '@types';
import { Base } from './base';

const hasher = new Hasher(parseInt(process.env.ROUND!) ?? 10);

@Entity({
  name: EntityNames.USERS,
  orderBy: { created_at: Ordering.ASC },
  synchronize: true,
  schema: SCHEMA,
})
export class User extends Base {
  public constructor(payload: Partial<User>) {
    super();

    Object.assign(this, payload);
  }

  @Column({
    type: ColumnType.VARCHAR,
    name: 'first_name',
    nullable: false,
  })
  firstName!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'first_name',
    nullable: false,
  })
  lastName!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'password',
    nullable: false,
  })
  password!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'email',
    nullable: false,
  })
  email!: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    try {
      const hashedPassword = await hasher.hash(this.password);

      this.password = hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  public async verifyPassword(value: string): Promise<boolean> {
    try {
      const isValid = await Hasher.compare(value, this.password);

      return isValid;
    } catch (error) {
      throw error;
    }
  }
}
