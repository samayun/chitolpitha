import {
  SignupUserInput,
  SigninUserInput,
} from '@chitolpitha/users/user.input';
import { AuthService } from './auth.service';
import { AccessTokenType } from './auth.entity';
import { User } from '@chitolpitha/users/user.entity';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessTokenType, { name: 'signup' })
  signup(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.authService.signup(signupUserInput);
  }

  @Query(() => AccessTokenType, { name: 'signin' })
  signin(@Args('signinUserInput') signinUserInput: SigninUserInput) {
    return this.authService.signin(signinUserInput);
  }
}
