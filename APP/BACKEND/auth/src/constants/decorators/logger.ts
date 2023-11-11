/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger as WinstonLogger } from 'winston';

import { MyLogger as Logger } from 'sdk';

import { Undefinable } from '@types';

export function LoggerDecorator(logger: Undefinable<WinstonLogger>): any {
  return function <C extends { name: string; kind: string } = any>(
    target: any,
    context: C,
  ): any {
    if (context.kind == 'method') {
      return async function (this: any, ...args: any[]): Promise<any> {
        // initialize the logger
        const methodLogger = Logger.setContext(
          __filename,
          context.name,
          args[0].requestId,
          logger!,
          { payload: args[0] },
        );

        try {
          const start = Date.now();

          // apply the method
          const response = await target.apply(this, args);

          // convert time to seconds
          const duration = (Date.now() - start) / 1000;

          // log the response
          methodLogger.log(
            JSON.stringify({
              response,
              duration: `${duration} seconds`,
            }),
          );

          return response;
        } catch (error) {
          // log the error and throw error;
          methodLogger.error(<Error>error);
          throw error;
        }
      };
    }
  };
}
