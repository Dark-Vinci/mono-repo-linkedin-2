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
  @Column()
  public name!: string;
}
