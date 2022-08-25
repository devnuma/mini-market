import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findOne({ email });
    if (!user) return null;

    //TODO: compare password here
    const { password: skip, ...others } = user;

    return others;
  }

  login(user: User) {
    const payload = { sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async verify(token: string) {
    const decoded = this.jwtService.verify(token);
    const user = await this.userService.findOne({ email: decoded?.email });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
