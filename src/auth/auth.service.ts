import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { isNotValid } from 'src/util/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findAuth(email);
    const validPassword = await isNotValid(password, user?.password);
    
    if (validPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    
    return {
        access_token: await this.jwtService.signAsync(payload),
      };
  }
}
