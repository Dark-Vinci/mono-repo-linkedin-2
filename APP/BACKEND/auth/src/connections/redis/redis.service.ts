import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { IORedisKey } from '@constants';

enum RedisTimerType {
  EX = 'EX',
}

@Injectable()
export class RedisClient {
  public constructor(@Inject(IORedisKey) private readonly redisClient: Redis) {}

  public async get(key: string): Promise<string> {
    try {
      const result = await this.redisClient.get(key);

      if (!result) {
        throw new Error('Not found');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async set(key: string, value: string): Promise<string> {
    try {
      const bufferedValue = Buffer.from(value);

      const res = await this.redisClient.set(key, bufferedValue);

      return res;
    } catch (error) {
      throw error;
    }
  }

  public async setWithDecay(
    key: string,
    value: string,
    timeInSecods = 1,
  ): Promise<string> {
    try {
      const bufferedValue = Buffer.from(value);

      const result = await this.redisClient.set(
        key,
        bufferedValue,
        RedisTimerType.EX,
        timeInSecods,
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}
