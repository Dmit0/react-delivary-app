import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guarg';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthReturnData, UserRegistrationDto, UserSignInDto, UserSignUpAddressDto } from './models/auth.models';
import { CurrentUser } from './utils/auth.utils';

@Controller('authentication')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@CurrentUser() user: any, @Body() userSignInDto: UserSignInDto): AuthReturnData {
    return this.authService.SignIn(user);
  }

  @Post('signUp')
  signUp(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.SignUp(userRegistrationDto);
  }

  @Post('verifyMail')
  verifyMail(@Body() email: string) {
    return this.authService.verifyMail(email);
  }

  //JWT CHECK
  @Post('signUpStep3')
  signUpStep3(@Body() userSignUpAddressDto: UserSignUpAddressDto) {
    return this.authService.signUpStep3(userSignUpAddressDto)
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@CurrentUser() user: any) {
    console.log('null')
  }

  @Get('checkToken')
  @UseGuards(JwtAuthGuard)
  validateToken() {
    return { status: true }
  }

  @Post('refreshToken')
  refreshToken(@Body() data: any) {
    return this.authService.refreshToken(data.token)
  }
}