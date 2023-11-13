import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  AfterLoad,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import {
  EntityNames,
  Hasher,
  ColumnType,
  Ordering,
  Nullable,
  OpenToEnum,
} from 'sdk';

import { SCHEMA } from '@constants';

import { Base } from './base';
import { Skill } from './skills';
import { Volunteering } from './volunteering';
import { Project } from './project';
import { School } from './school';
import { CareerBreak, WorkExperience } from './experiences';
import { License } from './license';

@Entity({
  name: EntityNames.USERS,
  orderBy: { created_at: Ordering.ASC },
  synchronize: false,
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
  public about!: Nullable<string>;

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

  @Column({
    name: 'open_to',
    enum: OpenToEnum,
    default: OpenToEnum.HIRING,
    nullable: true,
  })
  public openTo!: Nullable<OpenToEnum>;

  private previousPassword!: Nullable<string>;

  @OneToMany(() => Skill, (s) => s.user)
  public skills!: Skill[];

  @OneToMany(() => Volunteering, (v) => v.user)
  public volunteering!: Volunteering[];

  @OneToMany(() => WorkExperience, (w) => w.user)
  public workExperiences!: WorkExperience[];

  @OneToMany(() => CareerBreak, (c) => c.user)
  public careerBreak!: CareerBreak[];

  @ManyToMany(() => School, (s) => s.students)
  public schools!: School[];

  @OneToMany(() => Project, (p) => p.user)
  public projects!: Project[];

  @ManyToMany(() => License, (l) => l.users)
  public license!: License[];

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

  //websites
  //dp
  //converimage
  // skills
  // schools
  // experiences
  // projects
  // volunteering
  // license
}
