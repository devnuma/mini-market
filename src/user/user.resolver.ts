import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GetUsersArgs } from './dto/get-users.args';
import { DeleteUserInput } from './dto/delete-user.input';
import { GetUserArgs } from './dto/get-user.args';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { PermittedRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/constants/roles.constant';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { nullable: true })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'users', nullable: 'items' })
  findAll(@Args() getUsersArgs?: GetUsersArgs) {
    return this.userService.findAll(getUsersArgs);
  }

  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args() getUserArgs: GetUserArgs) {
    return this.userService.findOne(getUserArgs);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('deleteUserInput') { userId }: DeleteUserInput) {
    return this.userService.remove(userId);
  }

  // @ResolveField()
  // async follows(@Parent() user: User) {
  //   const { userId } = user;
  // }
}
