import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(user: any) {
    return this.userService.createUser(user.username, user.password);
  }

  async signupTenant(user: any) {
    return this.userService.createTenant(
      user.username,
      user.password,
      user.email,
    );
  }

  async signupBoardMember(user: any){
    return this.userService.createBoardMember(user.username, user.password, user.phone);
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      id: user.id,
      tenantId: user.tenant?.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string) : Promise<any> {
    const user = await this.userService.findOne(username);
    console.log("user found", user);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log("User found - remove password", result)

      return result;
    }
    return null;
  }
}
