import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import * as bcript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
    ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.sigIn(username);
    if(!user)throw new UnauthorizedException('username failed...');
    if (user && await bcript.compare(password, user.password)) {
        const { password, delete_at, ...result } = user;
        const payload = {id: result.id, username: result.username, };
        return {
            message: 'login success',
            access_token: this.jwtService.sign(payload),
            data: result,

        }
    }
   
    throw new UnauthorizedException('password failed...');
  }
}