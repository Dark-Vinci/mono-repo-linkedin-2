import winston from 'winston';
import Redis, { RedisOptions } from 'ioredis';
import { ModuleMetadata, FactoryProvider } from '@nestjs/common';

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

export type Nullable<Type> = Type | null;

export type OneOrMany<Type> = Type | Type[];

export type OneOrManyOrNull<Type> = Nullable<OneOrMany<Type>>;

export type NodeEnvType = 'development' | 'production' | 'test';

export type DBType = 'postgres';

export type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

export type RedisAsyncModuleOptions<T = never> = {
  useFactory: (
    ...args: T[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;
