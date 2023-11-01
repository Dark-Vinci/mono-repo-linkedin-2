import { Entity } from 'typeorm';

import { SCHEMA } from '@constants';
import { EntityNames, Ordering } from '@types';
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
