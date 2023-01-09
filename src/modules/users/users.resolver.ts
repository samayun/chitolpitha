import { User } from './user.entity';
import { UsersService } from './users.service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SignupUserInput, UpdateUserInput } from './user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: SignupUserInput) {
    return this.usersService.createUser(createUserInput);
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
