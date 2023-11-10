import { Column, Entity } from 'typeorm';

import { ColumnType, EntityNames, Nullable, Ordering } from 'sdk';

import { SCHEMA } from '@constants';

import { Base } from './base';

@Entity({
  name: EntityNames.PROJECTS,
  schema: SCHEMA,
  orderBy: { updated_at: Ordering.DESC },
  synchronize: false,
})
export class Project extends Base {
  public constructor(proj: Partial<Project>) {
    super();
    Object.assign(this, proj);
  }

  @Column({
    type: ColumnType.VARCHAR,
    name: 'name',
  })
  public name!: string;

  @Column({
    name: 'description',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public description!: string;

  @Column({
    name: 'start_date',
    type: ColumnType.TIMESTAMP,
    nullable: false,
  })
  public startDate!: Date;

  @Column({
    name: 'end_date',
    type: ColumnType.TIMESTAMP,
    nullable: true,
  })
  public endDate!: Nullable<Date>;

  // not a column
  @Column({
    name: 'currently',
    type: ColumnType.BOOLEAN,
    nullable: false,
    default: true,
  })
  public currently!: boolean;

  // skill
  // associated role
  // media
}
