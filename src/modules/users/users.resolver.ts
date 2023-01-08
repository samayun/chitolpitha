import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  signup(@Args('signupUserInput') signupUserInput: CreateUserInput) {
    return this.usersService.create(signupUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('key', { type: () => Int }) key: string) {
    return this.usersService.findOne(key);
  }

  @Mutation(() => User)
  updateUser(
    @Args('key', { type: () => Int }) key: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.usersService.update(key, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('key', { type: () => Int }) key: string) {
    return this.usersService.remove(key);
  }
}
