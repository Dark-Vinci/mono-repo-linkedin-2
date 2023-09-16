import { BaseEntity } from 'typeorm';
export declare class Session extends BaseEntity {
    id: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
}
