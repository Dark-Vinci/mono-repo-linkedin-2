import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { UUID } from 'sdk';

import { ColumnType, OrNull } from '@types';
import { CURRENT_TIMESTAMP } from '@constants';

export class Base extends BaseEntity {
  @PrimaryGeneratedColumn(ColumnType.UUID)
  id!: UUID;

  @CreateDateColumn({
    name: 'created_at',
    type: ColumnType.TIMESTAMP,
    nullable: false,
    default: CURRENT_TIMESTAMP,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: ColumnType.TIMESTAMP,
    nullable: false,
    default: CURRENT_TIMESTAMP,
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: ColumnType.TIMESTAMP,
    nullable: true,
  })
  deletedAt!: OrNull<Date>;

  @VersionColumn({
    name: 'version',
    type: ColumnType.INT,
    nullable: true,
    default: 1,
  })
  version!: number;
}
