/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger as WinstonLogger } from 'winston';

import { MyLogger as Logger } from 'sdk';

import { Undefinable } from '@types';

export function LoggerDecorator(logger: Undefinable<WinstonLogger>): any {
  return function (target: any, context: any): any {
    if (context.kind == 'method') {
      return function (this: any, ...args: any[]): any {
        const methodLogger = Logger.setContext(
          __filename,
          context.name,
          args[0].requestId,
          logger!,
          { payload: args[0] },
        );

        const start = Date.now();

        const response = target.apply(this, [...args, methodLogger]);

        const duration = (Date.now() - start) / 1000;

        methodLogger.log(
          JSON.stringify({
            response,
            duration: `${duration} seconds`,
          }),
        );

        return response;
      };
    }
  };
}
