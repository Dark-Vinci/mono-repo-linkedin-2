import { Entity } from 'typeorm';

import { EntityNames, Ordering } from 'sdk';

import { SCHEMA } from '@constants';

import { Base } from './base';

@Entity({
  name: EntityNames.BUSINESSES,
  orderBy: { created_at: Ordering.DESC },
  synchronize: true,
  schema: SCHEMA,
})
export class Business extends Base {
  name!: string;
}
