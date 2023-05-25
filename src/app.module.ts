// KEEP ON TOP
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfigModule } from '@config/config.module';
import { AppController } from './app.controller';
// import { MongooseModule } from '@nestjs/mongoose';
import LoaderModule from '@chitolpitha/domain.loader';
import { LoadGraphQLServer } from '@loaders/GraphQLServer';

@Module({
  imports: [AppConfigModule, LoadGraphQLServer, LoaderModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
