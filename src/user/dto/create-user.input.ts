import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsInt({ groups: ['someGroup'] })
  password: string;
}
