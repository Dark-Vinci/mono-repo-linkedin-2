// import winston from 'winston';

// declare namespace NodeJS {
//   interface Global {
//     logger: winston.Logger;
//   }
// }

type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

export type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

export interface AppController {
  readonly globalLogger: any;
  readonly appService: any;
  ping(payload: any): Promise<any>;
}

export enum RedisTimerType {
  EX = 'EX',
}

// declare let Myname: Partial<AppController>;
