import { ArgsType, PickType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@ArgsType()
export class GetUserArgs extends PickType(UserDto, [
  'userId',
  'email',
  'name',
  'roles',
] as const) {}
