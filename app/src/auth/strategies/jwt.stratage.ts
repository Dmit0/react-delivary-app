import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { exceptionErrors } from '../../constants/errors/exeptionsErrors';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  validate(payload: { id: string, email: string }) {//check
    return this.authService.validateTokenPayload(payload).pipe(
      map((user) => user || exceptionErrors.throwForbiddenError('Unauthorized')),
    ).toPromise();
  }
}