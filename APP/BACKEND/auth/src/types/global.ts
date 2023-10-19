import { NodeEnvType, DBType } from './type';

export interface AppController {
  readonly globalLogger: any;
  readonly appService: any;
  ping(payload: any): Promise<any>;
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
