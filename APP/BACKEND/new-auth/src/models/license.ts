import { Column, Entity, Index } from 'typeorm';

import { EntityNames, Ordering, Base } from 'sdk';

import { SCHEMA } from '@constants';

import { User } from './user';

@Entity({
  name: EntityNames.LICENSES,
  orderBy: { updated_at: Ordering.DESC },
  schema: SCHEMA,
  synchronize: false,
})
export class License extends Base {
  public constructor(license: Partial<License>) {
    super();
    Object.assign(this, license);
  }

  @Column({
    name: 'title',
    unique: true,
  })
  @Index({ unique: true })
  public title!: string;

  public users!: User[];
}
