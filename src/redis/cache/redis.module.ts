import {
  Global,
  Logger,
  Module,
  Provider,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import { redisUrl } from '@config/redis';
import { RedisService } from './redis.hash.service';
import { RedisService as RedisJsonService } from './redis.json.service';

export const CacheProvider: Provider = {
  provide: CACHE_MANAGER,
  useFactory: () => {
    const redis = new Redis(redisUrl);

    redis.on('ready', () => {
      Logger.verbose(`> Redis connected to :  ${redisUrl} 🔵`);
      Logger.verbose(
        `> Redis Commander : http://localhost:${
          process.env.REDIS_COMMANDER_PORT || 8081
        } 🚀`,
      );
      redis.hincrby('chitolpitha:connection', 'hits', 1);
    });

    redis.on('end', () => {
      process.env.REDIS_ENABLED = false as unknown as string;
      Logger.verbose(`> Redis connection end :  ${redisUrl}`);
    });

    redis.on('error', () => {
      process.env.REDIS_ENABLED = false as unknown as string;
      Logger.verbose(`> Redis connection error :  ${redisUrl} 🔴`);
    });

    return redis;
  },
};

@Global()
@Module({
  providers: [RedisService, CacheProvider, RedisJsonService],
  exports: [RedisService, CacheProvider, RedisJsonService],
})
export class RedisModule {}
