import { Global, Module } from '@nestjs/common';
import { LockService } from './redlock.service';
import { RedisModule } from '@redis/cache/redis.module';

@Global()
@Module({
  imports: [RedisModule],
  providers: [LockService],
  exports: [LockService],
})
export class RedisLockModule {}
