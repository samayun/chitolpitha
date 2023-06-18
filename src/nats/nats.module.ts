// import config from '@config';
import { getNatsOptions } from '@config';
import { Global, Module, Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';

export const NATS_CLIENT = 'NATS_CLIENT';

export const NatsProvider: Provider = {
  provide: NATS_CLIENT,
  useFactory: () => {
    const natsClient = ClientProxyFactory.create(getNatsOptions);
    return natsClient;
  },
};

@Global()
@Module({
  providers: [NatsProvider],
  exports: [NatsProvider],
})
export class NatsModule {}
