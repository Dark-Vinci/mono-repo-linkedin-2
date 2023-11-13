import { Column, Entity } from 'typeorm';

import { EntityNames, Ordering } from 'sdk';

import { SCHEMA } from '@constants';

import { Base } from './base';

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
  })
  public title!: string;
}
