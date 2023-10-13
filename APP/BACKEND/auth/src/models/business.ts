import { Entity } from 'typeorm';

import { SCHEMA } from '@constants';
import { EntityNames, Ordering } from '@types';
import { Base } from '.';

@Entity({
  name: EntityNames.BUSINESSES,
  orderBy: { created_at: Ordering.ASC },
  synchronize: true,
  schema: SCHEMA,
})
export class Business extends Base {
  name!: string;
}
