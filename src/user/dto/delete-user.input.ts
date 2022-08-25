import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  @IsNotEmpty()
  userId: string;
}
