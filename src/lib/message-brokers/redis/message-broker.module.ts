import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RedisOptions, ClientProxyFactory } from '@nestjs/microservices';

@Global()
@Module({})
export class RedisMQModule {
  static register(options: RedisOptions, name?: string): DynamicModule {
    const RedisMQProvider: Provider = {
      provide: name || 'MESSAGE_BROKER',
      useFactory: () => {
        const client = ClientProxyFactory.create(options);
        return client;
      },
    };

    return {
      module: RedisMQModule,
      providers: [RedisMQProvider],
      exports: [RedisMQProvider],
    };
  }
}
