import { NodeEnvType, DBType } from './type';
import winston from 'winston';

export interface AppController {
  readonly globalLogger: Undefinable<winston.Logger>;
  readonly appService: object;
  ping(payload: object): Promise<object>;
}

export interface configInterface {
  readonly dbPort: number;
  readonly dbHost: string;
  readonly dbMasterPassword: string;
  readonly dbSlavePassword: string;
  readonly dbUserName: string;
  readonly nodeEnv: NodeEnvType;
  readonly type: DBType;

  readonly jwtSecret: string;
  readonly jwtNotBefore: string;
  readonly jwtIssuer: string;
  readonly jwtExpiresIn: string;
}

export type Undefinable<T> = T | undefined;
