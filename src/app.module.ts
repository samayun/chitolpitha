import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoadGraphQLServer } from '@loaders/GraphQLServer';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from '@config/appConfig.module';


@Module({
  imports: [AppConfigModule,LoadGraphQLServer,  UsersModule],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
