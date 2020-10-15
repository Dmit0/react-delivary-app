import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import config from "config"

//сделать все из конфига
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.JWT_LOGIN_TOKEN_TIME },
      }),
    }),
  ],
  providers: [AuthService],
  controllers:[AuthController]
})
export class AuthModule {
}