import { Column, Entity } from 'typeorm';

import { EntityNames, Ordering, Base } from 'sdk';

import { SCHEMA } from '@constants';

@Entity({
  name: EntityNames.ORGANIZATIONS,
  schema: SCHEMA,
  orderBy: { updated_at: Ordering.DESC },
  synchronize: false,
})
export class Organization extends Base {
  public constructor(org: Partial<Organization>) {
    super();
    Object.assign(this, org);
  }

  @Column({
    type: 'varchar',
    name: 'name',
  })
  public name!: string;
}
