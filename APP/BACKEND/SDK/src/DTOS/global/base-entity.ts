import { CURRENT_TIMESTAMP } from '@constants';
import { ColumnType, Nullable } from '@types';
import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

export class Base extends BaseEntity {
    @PrimaryGeneratedColumn(ColumnType.UUID)
    id!: string;

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
    deletedAt!: Nullable<Date>;

    @VersionColumn({
        name: 'version',
        type: ColumnType.INT,
        nullable: true,
        default: 1,
    })
    version!: number;
}
