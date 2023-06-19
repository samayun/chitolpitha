import Redis from 'ioredis';
import Redlock, { Lock } from 'redlock';
// import { redisEnabled } from '@config/redis';
import { CACHE_MANAGER, Global, Inject, Injectable } from '@nestjs/common';

export type TConfig = {
  called?: boolean;
  version?: number;
};

@Injectable()
@Global()
export class LockService {
  public redlock: Redlock;

  constructor(@Inject(CACHE_MANAGER) public redisClient: Redis) {
    // Initialize RedLock
    const redlock = new Redlock([this.redisClient]);

    // Set the RedLock instance
    this.redlock = redlock;
  }

  async withLock(
    key: string,
    ttl: number,
    block: () => Promise<any>,
  ): Promise<any> {
    const lock: Lock = await this.redlock.acquire([key], ttl);

    try {
      const response = await block();
      return response;
    } catch (error) {
      lock.extend(ttl);
    } finally {
      await lock.release();
    }
  }

  async callOnce(key: string, block: () => Promise<any>, config?: TConfig) {
    const version = config?.version || 1;
    const isCalled: TConfig = await this.redisClient.hgetall(`lock:${key}`);

    if (!isCalled || (isCalled && +isCalled?.version != version)) {
      const response = await block();
      const pipeline = this.redisClient
        .pipeline()
        .hset(`lock:${key}`, 'called', 'true')
        .hset(`lock:${key}`, 'response', JSON.stringify(response))
        .hset(`lock:${key}`, 'version', version);
      await pipeline.exec();

      return response;
    }

    return null;
  }
}
