import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'email of the user)' })
  email: string;


  @Field(() => String, { nullable: true, description: 'phone of the user' })
  phone: string;


  @Field(() => String, { description: 'password of the user. It should be hidden. use in schema not gql type on production' })
  password: string;

  @Field(() => String, {defaultValue: 'ACTIVE', description: 'status of the user' })
  status: string;
}
