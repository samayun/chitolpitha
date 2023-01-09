// KEEP ON TOP
import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config/appConfig.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
// import { MongooseModule } from '@nestjs/mongoose';
import { LoaderModule } from '@loaders/LoaderModule';
import { LoadGraphQLServer } from '@loaders/GraphQLServer';

@Module({
  imports: [
    AppConfigModule,
    LoadGraphQLServer,
    LoaderModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }


