import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import {
  CASCADE,
  ColumnType,
  EntityNames,
  ID,
  JoinColumnId,
  Nullable,
  Ordering,
} from 'sdk';

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

  @Column({
    name: 'skill_id',
    type: ColumnType.VARCHAR,
    nullable: true,
  })
  public skillId!: string;

  @Column({
    name: 'work_experience_id',
    type: ColumnType.VARCHAR,
    nullable: true,
  })
  public workExperinceId!: string;

  @ManyToOne(() => User, (u) => u.projects, {
    onDelete: CASCADE,
  })
  @JoinColumn({
    name: JoinColumnId.USER_ID,
    referencedColumnName: ID,
  })
  public user!: User;

  @OneToMany(() => Skill, (s) => s.projects)
  @JoinColumn({
    name: JoinColumnId.SKILL_ID,
    referencedColumnName: ID,
  })
  public skills!: Skill[];

  @OneToOne(() => WorkExperience, (w) => w.projects, {
    onDelete: CASCADE,
  })
  @JoinColumn({
    name: JoinColumnId.WORK_EXPERIENCE_ID,
    referencedColumnName: ID,
  })
  public associatedRole!: WorkExperience;

  @OneToMany(() => Media, (m) => m.projects, {
    onDelete: CASCADE,
  })
  // ids will be stored in media
  public medias!: Media[];

  public currently = !!this.endDate;
}
