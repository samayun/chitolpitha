// KEEP ON TOP
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppController, AppService],
  exports: [AppController, AppService],
})
export class AppModule {}
