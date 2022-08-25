import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'admin',
  MEMBER = 'member',
  SELLER = 'seller',
}

registerEnumType(Role, {
  name: 'Role',
});
