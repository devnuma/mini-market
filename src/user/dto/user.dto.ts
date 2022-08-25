import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray, IsEmail, IsOptional } from 'class-validator';
import { Role } from 'src/common/constants/roles.constant';

@ArgsType()
export class UserDto {
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  userIds?: string[];

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => [Role], { nullable: true })
  roles?: Role[];
}
