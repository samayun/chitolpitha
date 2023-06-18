import { getRedisOptions } from '@main';
import { APP_SERVICE } from '@common/shared/constants';
import { Global, Module, Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

export const MessageBrokerProvider: Provider = {
  provide: APP_SERVICE,
  useFactory: () => {
    const client = ClientProxyFactory.create(getRedisOptions);

    return client;
  },
};

@Global()
@Module({
  providers: [MessageBrokerProvider],
  exports: [MessageBrokerProvider],
})
export class MessageBrokerModule {}
