import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ColumnType, EntityNames, Nullable, Ordering } from 'sdk';

import { SCHEMA } from '@constants';

import { Base } from './base';
import { User } from './user';
import { WorkExperience } from './experiences';
import { Skill } from './skills';
import { Media } from './media';

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

  @Column({
    name: 'user_id',
    type: ColumnType.VARCHAR,
    nullable: false,
  })
  public userId!: string;

  @ManyToOne(() => User, (u) => u.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  public user!: User;

  public skills!: Skill[];

  public associatedRole!: WorkExperience;

  public medias!: Media[];

  public currently = !!this.endDate;
}
