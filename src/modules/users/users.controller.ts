import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserControler {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ topic: 'users' })
  async handleMessage(users: any) {
    console.log('Received users:', users);
    return this.usersService.findAll();
  }
}
