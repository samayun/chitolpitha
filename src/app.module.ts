// KEEP ON TOP
import config from '@config';
import { AppService } from './app.service';
import { NatsModule } from '@nats/nats.module';
import { Module, Logger } from '@nestjs/common';
import { AppConfigModule } from '@config/config.module';
import { AppController } from './app.controller';
// import { MongooseModule } from '@nestjs/mongoose';
import LoaderModule from '@chitolpitha/domain.loader';
import { LoadGraphQLServer } from '@loaders/GraphQLServer';
import { MessageBrokerModule } from '@redis/message-broker/message-broker.module';

@Module({
  imports: [
    AppConfigModule,
    LoadGraphQLServer,
    LoaderModule.forRoot(),
    MessageBrokerModule,
    NatsModule,
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
