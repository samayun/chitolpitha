import { AppService } from './app.service';
import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config.module';
import LoaderModule from '@chitolpitha/domain.loader';
import { LoadGraphQLServer } from '@loaders/GraphQLServer';
import { MessageBrokerModule } from '@lib/message-brokers';
import { MESSAGE_BROKER, NATS_CLIENT } from '@common/constants';
import config, { getNatsOptions, getRedisOptions } from '@config';

@Module({
  imports: [
    AppConfigModule,
    LoadGraphQLServer,
    LoaderModule.forRoot(),
    MessageBrokerModule.register(getNatsOptions, NATS_CLIENT),
    MessageBrokerModule.register(getRedisOptions, MESSAGE_BROKER),
  ],
  controllers: [AppController],
  providers: [AppController, AppService],
  exports: [AppController, AppService],
})
export class AppModule {
  onApplicationBootstrap() {
    Logger.verbose(`>> DB Connected : ${config.db.url} 🔵`);

    if (process.env.NODE_ENV === 'development') {
      Logger.verbose(
        `> Documentation is here => ${config.server.host}:${config.server.port}/${config.api.swaggerPrefix} 🟢`,
      );

      Logger.verbose(
        `🚀> GraphQL playground is here => ${config.server.host}:${config.server.port}/graphql 🟢`,
      );
    }
  }
}
