import { Injectable } from '@nestjs/common';
import { SignupUserInput, UpdateUserInput } from './user.input';

@Injectable()
export class UsersService {
  createUser(createUserInput: SignupUserInput) {
    return {
      _id: String(Math.random() * 1000),
      ...createUserInput,
    };
  }

  findAll() {
    return [{ id: 88 }];
  }

  findOne(id: string) {
    return { id: id };
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return {
      id,
      ...updateUserInput,
    };
  }

  remove(id: string) {
    return this.findOne(id);
  }
}
