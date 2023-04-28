import {
  Controller,
  Post,
  Request as Request2,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request2() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signup(@Request2() req) {
    console.log('body', req.body);  

    return this.authService.signup(req.body);
  }

  @Post('auth/signup-tenant')
  async signupTenant(@Request2() req) {
    console.log('body', req.body);

    return this.authService.signupTenant(req.body);
  }

  @Post('auth/signup-boardmember')
  async signupBoardMember(@Request2() req){
    console.log('body', req.body);

    return this.authService.signupBoardMember(req.body);
  }
}
