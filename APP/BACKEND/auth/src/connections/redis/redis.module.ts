import {
  DynamicModule,
  FactoryProvider,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import IORedis, { RedisOptions, Redis } from 'ioredis';

import { IORedisKey } from '@constants';
import { RedisClient } from '.';

type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

type RedisAsyncModuleOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Module({})
export class RedisModule {
  public static async registerAsync<T extends RedisAsyncModuleOptions>({
    useFactory,
    imports,
    inject,
  }: T): Promise<DynamicModule> {
    const redisProvider = {
      provide: IORedisKey,
      inject,
      useFactory: async (...args: any[]) => {
        const { connectionOptions, onClientReady } = await useFactory(args);
        const client = new IORedis(connectionOptions);

        if (onClientReady) {
          onClientReady(client);
        }

        return client;
      },
    };

    return {
      module: RedisModule,
      imports,
      providers: [redisProvider, RedisClient],
      exports: [redisProvider],
    } as DynamicModule;
  }
}
