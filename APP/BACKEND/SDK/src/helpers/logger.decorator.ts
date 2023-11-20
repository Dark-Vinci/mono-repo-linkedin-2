import { Logger as WinstonLogger } from 'winston';

import { Undefinable } from '@types';

import { MyLogger } from './logger';

enum DecoratorFor {
  METHOD = 'method',
}

export function LoggerDecorator<
    DType extends { run: () => Promise<void> }
  >(
    logger: Undefinable<WinstonLogger>, 
    fileName: string, 
    defer?: DType
  ): any {
  return function <
    C extends { name: string; kind: string } = any
  >(
    target: any,
    context: C,
  ): any {
    if (context.kind == DecoratorFor.METHOD) {
      return async function (
        this: any, 
        ...args: any[]
      ): Promise<any> {
        if (defer) {
          await using stack = new AsyncDisposableStack();

          stack.defer(async () => {

            await defer.run();
          });
        }

        // initialize the logger
        const methodLogger = MyLogger.setContext(
          fileName,
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
        } catch (error: unknown) {
          // log the error and throw error;
          methodLogger.error(<Error>error);
          throw error;
        }
      };
    }
  };
}
