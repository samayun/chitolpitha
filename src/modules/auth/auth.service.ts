import {
  SignupUserInput,
  SigninUserInput,
} from '@chitolpitha/users/user.input';
import { Injectable } from '@nestjs/common';
import { AccessTokenType } from './auth.entity';

@Injectable()
export class AuthService {
  signup(signupUserInput: SignupUserInput): AccessTokenType {
    return {
      accessToken: signupUserInput.email,
    };
  }

  signin(signinUserInput: SigninUserInput): AccessTokenType {
    return {
      accessToken: signinUserInput.email,
    };
  }
}
