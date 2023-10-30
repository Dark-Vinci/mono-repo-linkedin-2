import { DynamicModule, Module } from '@nestjs/common';
import IORedis from 'ioredis';

import { IORedisKey } from '@constants';
import { RedisAsyncModuleOptions } from '@types';
import { RedisClient } from './redis.service';

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
      useFactory: async (...args: unknown[]) => {
        // @ts-ignore
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
