import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'ID of the user' })
  _id: string;

  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'email of the user)' })
  email: string;


  @Field(() => String, { nullable: true, description: 'password of the user. It should be hidden. use in schema not gql type on production' })
  password: string;

  @Field(() => String, { nullable: true, description: 'status of the user' })
  status: string;
}
