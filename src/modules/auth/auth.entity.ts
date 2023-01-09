import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenType {

  @Field(() => String, { nullable: true, description: 'accessToken of the auth user' })
  accessToken: string;
}
