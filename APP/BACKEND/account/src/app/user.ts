import global from 'globals';

import { Injectable } from '@nestjs/common';
import { LoggerDecorator } from 'sdk';

import { UserStore } from '@store';
import { User } from '@models';

@Injectable()
export class UserService {
  public constructor(private readonly userStore: UserStore) {}

  @LoggerDecorator(global.logger, __filename)
  public async me(): Promise<User> {
    const user = await this.userStore.getOne({});

    return user;
  }
}
