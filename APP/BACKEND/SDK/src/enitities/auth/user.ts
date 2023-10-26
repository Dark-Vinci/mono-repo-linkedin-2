// export {};

import { UUID } from '@helpers';

export class Users {
  public created_at: Date;
  public updated_at: Date;
  public id: UUID | string;
  public firstName: string;
  public lastName: string;
  public email: string;
}
