import { Column, Entity } from 'typeorm';

import { EntityNames, Ordering } from '@types';
import { SCHEMA } from '@constants';

import { Base } from './base';

@Entity({
  name: EntityNames.EXPERIENCES,
  orderBy: { updated_at: Ordering.DESC },
  synchronize: false,
  schema: SCHEMA,
})
export class Experiences extends Base {
  @Column({})
  public title!: string;

  public constructor(experience: Partial<Experiences>) {
    super();
    Object.assign(this, experience);
  }
}
