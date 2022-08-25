import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class GetAppArgs {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;

  @Field()
  count?: number;
}
