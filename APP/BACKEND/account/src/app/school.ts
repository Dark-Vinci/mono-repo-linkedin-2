import global from 'globals';

import { Injectable } from '@nestjs/common';
import { LoggerDecorator } from 'sdk';

import { SchoolStore } from '@store';

@Injectable()
export class UserService {
  public constructor(private readonly schoolStore: SchoolStore) {}

  @LoggerDecorator(global.logger, __filename)
  public async me(): Promise<number> {
    console.log({ abc: this.schoolStore });
    // const user = await this.userStore.getOne({});

    return 1;
  }
}
