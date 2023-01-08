import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  create(signupUserInput: CreateUserInput) {
    return {
      _id: String(Math.random() * 1000),
      ...signupUserInput
    }
  }

  findAll() {
    return [{id: 88}]
  }

  findOne(id: string) {
    return {id: id}
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return {
      id,
      ...updateUserInput
    }
  }

  remove(id: string) {
    return this.findOne(id);
  }
}
