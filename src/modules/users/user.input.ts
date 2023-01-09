import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignupUserInput {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'email of the user)' })
  email: string;

  @Field(() => String, { description: 'password of the user. It should be hidden. use in schema not gql type on production' })
  password: string;

  @Field(() => String, { defaultValue: 'ACTIVE', description: 'status of the user' })
  status: string;
}


@InputType()
export class SigninUserInput {
  @Field(() => String, { description: 'email of the user)' })
  email: string;

  @Field(() => String, { description: 'password of the user. It should be hidden. use in schema not gql type on production' })
  password: string;
}


@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { defaultValue: 'ACTIVE', description: 'status of the user' })
  status: string;
}
