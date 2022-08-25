import { ArgsType, IntersectionType, PickType } from '@nestjs/graphql';
import { GetAppArgs } from 'src/common/dto/app.args';
import { UserDto } from './user.dto';

@ArgsType()
class UserPagination extends PickType(GetAppArgs, [
  'limit',
  'offset',
] as const) {}

@ArgsType()
class GetUser extends PickType(UserDto, [
  'userId',
  'userIds',
  'email',
  'name',
  'roles',
] as const) {}

@ArgsType()
export class GetUsersArgs extends IntersectionType(GetUser, UserPagination) {}
