import { Column, Entity } from 'typeorm';

import { EntityNames, Ordering, Base } from 'sdk';

import { SCHEMA } from '@constants';

@Entity({
  name: EntityNames.ACTIVITIES,
  orderBy: { created_at: Ordering.DESC },
  synchronize: false,
  schema: SCHEMA,
})
export class Activities extends Base {
  public constructor(payload: Partial<Activities>) {
    super();

    Object.assign(this, payload);
  }

  @Column()
  public name!: string;
}
