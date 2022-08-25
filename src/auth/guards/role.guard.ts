import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from 'src/common/constants/roles.constant';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req?.user;
    const roles = [Role.ADMIN];

    const rolesFromMethod = this.reflector.getAllAndOverride(ROLES_KEY, [
      ctx.getHandler(),
    ]);
    if (rolesFromMethod?.length) roles.push(rolesFromMethod);

    const rolesFromClass = this.reflector.getAllAndOverride(ROLES_KEY, [
      ctx.getClass(),
    ]);
    if (rolesFromClass?.length) roles.push(rolesFromClass);

    return roles.some((el) => user?.roles?.includes(el));
  }
}
