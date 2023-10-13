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

export enum AuthDatabase {
  MASTER = 'auth_master',
  SLAVE1 = 'auth_slave1',
  SLAVE2 = 'auth_slave2',
  SLAVE3 = 'auth_slave3',
}

export enum DBPassword {
  MASTER = 'dbMasterPassword',
  SLAVE = 'dbSlavePassword',
}

export type NodeEnvType = 'development' | 'production' | 'test';

export type DBType = 'postgres';

export interface configInterface {
  readonly dbPort: number;
  readonly dbHost: string;
  readonly dbMasterPassword: string;
  readonly dbSlavePassword: string;
  readonly dbUserName: string;
  readonly nodeEnv: NodeEnvType;
  readonly type: DBType;
}

// declare let Myname: Partial<AppController>;
