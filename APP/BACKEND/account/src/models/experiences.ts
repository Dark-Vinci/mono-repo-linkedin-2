import { Column, Entity } from 'typeorm';

import {
  EntityNames,
  Nullable,
  Ordering,
  ColumnType,
  EmploymentType,
  ExperienceType,
  Base,
} from 'sdk';

import { CURRENT_TIMESTAMP, SCHEMA } from '@constants';

import { User } from './user';
import { Project } from './project';

@Entity({
  name: EntityNames.EXPERIENCES,
  orderBy: { updated_at: Ordering.DESC },
  synchronize: false,
  schema: SCHEMA,
})
export class WorkExperience extends Base {
  public constructor(experience: Partial<WorkExperience>) {
    super();
    Object.assign(this, experience);
  }

  @Column({
    name: 'title',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public title!: string;

  @Column({
    name: 'industry',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public industry!: string;

  @Column({
    name: 'description',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public description!: string;

  @Column({
    name: 'employment_type',
    enum: EmploymentType,
    type: ColumnType.ENUM,
  })
  public employmentType!: EmploymentType;

  @Column({
    name: 'company_name',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public companyName!: string;

  @Column({
    name: 'type',
    type: ColumnType.ENUM,
    nullable: false,
    enum: ExperienceType,
    default: ExperienceType.POSITION,
  })
  public type!: ExperienceType;

  // @
  public projects!: Project[];

  public user!: User;
}

@Entity({
  name: EntityNames.CAREER_BREAK,
  schema: SCHEMA,
  synchronize: false,
  orderBy: { updatedAt: Ordering.DESC },
})
export class CareerBreak extends Base {
  public constructor(careerBreak: Partial<CareerBreak>) {
    super();
    Object.assign(this, careerBreak);
  }

  @Column({
    type: ColumnType.VARCHAR,
    name: 'location',
    nullable: true,
  })
  public location!: string;

  @Column({
    type: ColumnType.BOOLEAN,
    name: 'currently',
    nullable: false,
    default: true,
  })
  public currently!: boolean;

  @Column({
    type: ColumnType.TIMESTAMP,
    name: 'start_date',
    nullable: false,
    default: CURRENT_TIMESTAMP,
  })
  public startDate!: Date;

  @Column({
    type: ColumnType.TIMESTAMP,
    name: 'last_date',
    nullable: true,
  })
  public lastDate!: Nullable<Date>;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'type',
    nullable: false,
  })
  public type!: string;

  @Column({
    type: ColumnType.TEXT,
    name: 'description',
    nullable: false,
  })
  public description!: string;

  @Column({
    type: ColumnType.VARCHAR,
    name: 'headline',
    nullable: false,
  })
  public headline!: string;

  public user!: User;

  // media
}
