import config from '@config';
import { PUB_SUB } from '@common/shared/constants';
import { Global, Module, Provider } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PubSubProvider: Provider = {
  provide: PUB_SUB,
  useFactory: () => {
    const pubsub = new RedisPubSub({
      connection: {
        host: config.redis.host,
        port: config.redis.port,
      },
      //       publisher: cluster,
      //       subscriber: cluster,
    });

    return pubsub;
  },
};

@Global()
@Module({
  providers: [PubSubProvider],
  exports: [PubSubProvider],
})
export class PubSubModule {}
