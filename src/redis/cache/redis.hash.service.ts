import Redis from 'ioredis';
import { redisEnabled } from '@config/redis';
import { CACHE_MANAGER, Global, Inject, Injectable } from '@nestjs/common';

@Global()
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) public redis: Redis) {}

  async onApplicationBootstrap() {
    if (redisEnabled) {
      try {
        const key = `octopus:hash:1`;
        const data = { lang: 'NodeJS', framework: 'Nest' };

        const cacheUpdater = await this.cacheUpdater(key, data);
        const cacheChecker = await this.cacheChecker(key);

        console.log({ cache: 'cache', cacheChecker, cacheUpdater });
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async cacheChecker(key: string) {
    if (!redisEnabled) return null;

    try {
      const value: any = await this.redis.hgetall(key);

      if (value && Object.keys(value).length == 0) return null;

      return value;
    } catch (error) {
      return null;
    }
  }

  async cacheUpdater(key: string, data: any) {
    if (!redisEnabled) return null;

    try {
      const result = await this.redis.hset(key, data);
      return result;
    } catch (error) {
      return null;
    }
  }

  async cacheIncrement(key: string, feild: string, how: number) {
    if (!redisEnabled) return null;

    try {
      const data = await this.redis.hincrby(key, feild, how);
      return data;
    } catch (error) {
      return null;
    }
  }
  async cacheRemover(key: string) {
    if (!redisEnabled) return null;

    try {
      const data = await this.redis.del(key);
      return data;
    } catch (error) {
      return null;
    }
  }

  async reset() {
    if (!redisEnabled) return null;

    try {
      const data = await this.redis.reset();
      return data;
    } catch (error) {
      return null;
    }
  }

  async onModuleDestroy() {
    await this.redis.disconnect();
    console.log(`Redis disconnected`);
  }

  async otpCacheUpdate(phone: string, data: any, minute: number) {
    if (!redisEnabled) return null;

    try {
      const result = await this.redis.set(
        phone,
        JSON.stringify(data),
        'EX',
        minute * 60,
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  async otpCacheCheck(phone: string) {
    if (!redisEnabled) return null;
    return this.cacheChecker(phone);
  }

  async otpCacheRemove(phone: string) {
    if (!redisEnabled) return null;
    return this.cacheRemover(phone);
  }
}
