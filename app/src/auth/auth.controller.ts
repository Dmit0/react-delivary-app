import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '../participants/user-main/user/models/user.types';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guarg';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshTokenDto, UserCreateDto, UserSignUpAddressDto } from './models/auth.dto';
import { AuthReturnData } from './models/auth.models';
import { CurrentUser } from './utils/auth.utils';

@Controller('authentication')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@CurrentUser() user: IUser): AuthReturnData {
    return this.authService.SignIn(user);
  }

  @Post('signUp')
  signUp(@Body() userRegistrationDto: UserCreateDto) {
    return this.authService.SignUp(userRegistrationDto);
  }

  @Post('verifyMail')
  verifyMail(@Body() email: string) {
    return this.authService.verifyMail(email);
  }

  @UseGuards(JwtAuthGuard)
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
  googleAuthRedirect(@CurrentUser() user: IUser) {
    console.log('null')
  }

  @Get('checkToken')
  @UseGuards(JwtAuthGuard)
  validateToken() {
    return { status: true }
  }

  @Post('refreshToken')
  refreshToken(@Body() data: RefreshTokenDto) {
    return this.authService.refreshToken(data.token)
  }
}