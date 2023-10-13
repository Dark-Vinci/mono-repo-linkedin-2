import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { UUID } from 'sdk';

import { ColumType, OrNull } from '@types';
import { CURRENCT_TIMESTAMP } from '@constants';

export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: UUID;

  @CreateDateColumn({
    name: 'created_at',
    type: ColumType.TIMESTAMP,
    nullable: false,
    default: CURRENCT_TIMESTAMP,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: ColumType.TIMESTAMP,
    nullable: false,
    default: CURRENCT_TIMESTAMP,
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: ColumType.TIMESTAMP,
    nullable: true,
  })
  deletedAt!: OrNull<Date>;

  @VersionColumn({
    name: 'version',
    type: ColumType.INT,
    nullable: true,
    default: 1,
  })
  version!: number;
}
