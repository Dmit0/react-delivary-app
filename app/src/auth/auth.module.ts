import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AddressModule } from '../participants/user-main/address/address.module';
import { PhoneModule } from '../participants/user-main/phone/phone.module';
import { RolesModule } from '../participants/user-main/roles/roles.module';
import { UserModule } from '../participants/user-main/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.stratage';
import { JwtStrategy } from './strategies/jwt.stratage';
import { LocalStrategy } from './strategies/local.stratage';

//сделать все из конфига
@Module({
  imports: [
    UserModule,
    PassportModule,
    RolesModule,
    PhoneModule,
    AddressModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.JWT_LOGIN_TOKEN_TIME },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, GoogleStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
}