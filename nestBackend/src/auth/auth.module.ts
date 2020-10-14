import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


//сделать все из конфига
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret',
        signOptions: { expiresIn: '30m' },
      }),
    }),
  ],
  providers: [AuthService],
  controllers:[AuthController]
})
export class AuthModule {
}