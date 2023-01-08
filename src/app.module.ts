import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoadGraphQLServer } from '@loaders/GraphQLServer';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [LoadGraphQLServer,  UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
