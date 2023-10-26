import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { Util } from '../util';

import { UUID } from '../uuid';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      id?: UUID;
    }
  }
}

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  public constructor(@Inject(Util) private readonly util: Util) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    req.id = this.util.generateUUID();
  }
}
