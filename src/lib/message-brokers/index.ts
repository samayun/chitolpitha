import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ClientOptions, ClientProxyFactory } from '@nestjs/microservices';

@Global()
@Module({})
export class MessageBrokerModule {
  static register(options: ClientOptions, name?: string): DynamicModule {
    console.log({ options: options });

    const MBProvider: Provider = {
      provide: name || 'MESSAGE_BROKER',
      useFactory: () => {
        const client = ClientProxyFactory.create(options);
        return client;
      },
    };

    return {
      module: MessageBrokerModule,
      providers: [MBProvider],
      exports: [MBProvider],
    };
  }
}
