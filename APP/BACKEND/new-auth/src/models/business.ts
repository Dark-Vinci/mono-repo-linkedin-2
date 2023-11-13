import { Entity } from 'typeorm';

import { EntityNames, Ordering, Base } from 'sdk';

import { SCHEMA } from '@constants';

@Entity({
  name: EntityNames.BUSINESSES,
  orderBy: { created_at: Ordering.DESC },
  synchronize: true,
  schema: SCHEMA,
})
export class Business extends Base {
  name!: string;
}
