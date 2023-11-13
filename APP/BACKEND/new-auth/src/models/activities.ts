import { Column, Entity } from 'typeorm';

import { EntityNames, Ordering } from 'sdk';

import { SCHEMA } from '@constants';

import { Base } from './base';

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
