import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

export type OrNull<Type> = Type | null;

export type OneOrMany<Type> = Type | Type[];

export type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

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
