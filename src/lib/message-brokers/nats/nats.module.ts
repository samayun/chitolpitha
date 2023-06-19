import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ClientProxyFactory, NatsOptions } from '@nestjs/microservices';

@Global()
@Module({})
export class NatsModule {
  static register(options: NatsOptions, name?: string): DynamicModule {
    const NatsProvider: Provider = {
      provide: name || 'NATS_CLIENT',
      useFactory: () => {
        const natsClient = ClientProxyFactory.create(options);
        return natsClient;
      },
    };

    return {
      module: NatsModule,
      providers: [NatsProvider],
      exports: [NatsProvider],
    };
  }
}
