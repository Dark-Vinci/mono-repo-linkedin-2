import { Injectable } from '@nestjs/common';
import { UUID } from 'sdk/dist/helpers';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public ping(requestId: string): UUID {
    return UUID.parse(requestId);
  }
}
