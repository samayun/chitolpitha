import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoadGraphQLServer } from '@loaders/GraphQLServer';


@Module({
  imports: [LoadGraphQLServer],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
