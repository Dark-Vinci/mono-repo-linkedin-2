import { Column, Entity } from 'typeorm';

import {
  ColumnType,
  EmploymentType,
  EntityNames,
  ExperienceType,
  Ordering,
} from '@types';
import { SCHEMA } from '@constants';

import { Base } from './base';

@Entity({
  name: EntityNames.EXPERIENCES,
  orderBy: { updated_at: Ordering.DESC },
  synchronize: false,
  schema: SCHEMA,
})
export class Experiences extends Base {
  public constructor(experience: Partial<Experiences>) {
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
  })
  public type!: ExperienceType;
}
