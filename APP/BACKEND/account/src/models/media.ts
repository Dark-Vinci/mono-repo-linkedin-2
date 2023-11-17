import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ColumnType, MediaFor, Ordering, Base } from 'sdk';

import { SCHEMA } from '@constants';

// import { Base } from './base';
import { Project } from './project';

@Entity({
  name: '',
  schema: SCHEMA,
  orderBy: { upddatedAt: Ordering.DESC },
  synchronize: false,
})
export class Media extends Base {
  @Column({
    name: 'url',
    nullable: false,
    type: ColumnType.TEXT,
  })
  public url!: string;

  @Column({
    name: 'url_for',
    enum: MediaFor,
    nullable: false,
  })
  public urlFor!: MediaFor;

  @Column({
    name: 'entity_id',
    nullable: false,
    type: ColumnType.VARCHAR,
  })
  public entityId!: string;

  @ManyToOne(() => Project, (p) => p.medias)
  @JoinColumn({
    name: 'entity_id',
    referencedColumnName: 'id',
  })
  public projects!: Project;
}
