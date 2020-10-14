import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('restaurants')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Get()
  //type for returning getMeal
  //type fot input
  login(): any {
    return this.authService.SignIn();
  }

  @Get()
  SignUp():any{
    return this.authService.SignUp()
  }
}