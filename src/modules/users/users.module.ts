import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserControler } from './users.controller';

@Module({
  controllers: [UserControler],
  providers: [UsersResolver, UsersService],
})
export default class UsersModule {}
