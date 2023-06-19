import config from '@config';
import { Redis } from 'ioredis';
import { PUB_SUB } from '@common/constants';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Scope, Global, Inject, Module, Provider } from '@nestjs/common';

export const PubSubProvider: Provider = {
  provide: PUB_SUB,
  scope: Scope.DEFAULT,
  useFactory: () => {
    const pubSub = new RedisPubSub({
      publisher: new Redis(config.redisPublisher),
      subscriber: new Redis(config.redisSubscriber),
    });

    return pubSub;
  },
};

@Global()
@Module({
  providers: [PubSubProvider],
  exports: [PubSubProvider],
})
export class PubSubModule {
  constructor(@Inject(PUB_SUB) private pubSub: RedisPubSub) {}

  async onApplicationBootstrap() {
    // await this.pubSub.publish('test', {
    //   title: 'ONEK KICHU',
    // });
    // await this.pubSub.subscribe('test', (data) => {
    //   console.log({ data });
    // });
    // console.log({
    //   pubSub: await this.pubSub.subscribe('test', (data) => {
    //     console.log({ data });
    //   }),
    // });
  }
}
