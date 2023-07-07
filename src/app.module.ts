import { AppService } from './app.service';
import { AwsModule } from '@aws/aws.module';
import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './config.module';
import LoaderModule from '@chitolpitha/domain.loader';
import { LoadGraphQLServer } from '@loaders/GraphQLServer';
import { MulterModule } from '@nestjs/platform-express';
import { MessageBrokerModule } from '@lib/message-brokers';
import config, { getNatsOptions, getRedisOptions } from '@config';
import { REDIS_MESSAGE_BROKER, NATS_CLIENT } from '@common/constants';
import { FileUploadMiddleware } from '@lib/middleware/file-upload';

@Module({
  imports: [
    AwsModule,
    AppConfigModule,
    LoadGraphQLServer,
    LoaderModule.forRoot(),
    MessageBrokerModule.register(getNatsOptions, NATS_CLIENT),
    MessageBrokerModule.register(getRedisOptions, REDIS_MESSAGE_BROKER),
    MulterModule.register(FileUploadMiddleware.multerOptions),
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
