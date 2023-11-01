import { BeforeInsert, BeforeUpdate, Column, Entity, AfterLoad } from 'typeorm';

import { Hasher } from 'sdk';

import { SCHEMA } from '@constants';
import { ColumnType, EntityNames, Ordering, OrNull } from '@types';

import { Base } from './base';

@Entity({
  name: EntityNames.USERS,
  orderBy: { created_at: Ordering.ASC },
  synchronize: true,
  schema: SCHEMA,
})
export class User extends Base {
  private readonly hasher = new Hasher(parseInt(process.env.ROUND!) ?? 10);

  public constructor(payload: Partial<User>) {
    super();

    Object.assign(this, payload);
  }

  @Column({
    type: ColumnType.VARCHAR,
    name: 'first_name',
    nullable: false,
  })
  public firstName!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'first_name',
    nullable: false,
  })
  public lastName!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'password',
    nullable: false,
  })
  public password!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'email',
    nullable: false,
  })
  public email!: string;

  @Column({
    name: 'about',
    type: ColumnType.TEXT,
    nullable: true,
  })
  public about!: OrNull<string>;

  @Column({
    name: 'phone_number',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public phoneNumber!: string;

  @Column({
    name: 'date_of_birth',
    type: ColumnType.TIMESTAMP,
    nullable: false,
  })
  public dateOfBirth!: Date;

  public previousPassword!: OrNull<string>;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    try {
      if (this.password == this.previousPassword && this.password) {
        const hashedPassword = await this.hasher.hash(this.password);

        this.password = hashedPassword;
      }
    } catch (error) {
      throw error;
    }
  }

  public async verifyPassword(value: string): Promise<boolean> {
    try {
      const isValid = await this.hasher.compare(value, this.password);

      return isValid;
    } catch (error) {
      throw error;
    }
  }

  // websites
  // dp
  //   converimage
}
