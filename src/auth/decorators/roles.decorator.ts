import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/constants/roles.constant';

export const ROLES_KEY = 'roles';
export const PermittedRoles = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);
