import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { exceptionErrors } from '../../constants/errors/exeptionsErrors';
import { AuthService } from '../auth.service';

@Injectable()
export class BuyStrategy extends PassportStrategy(Strategy, 'opportunity-buy') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  validate(payload: { id: string }) {
    return this.authService.validateVerifiedUserTokenPayload(payload).pipe(
      map((user) => user || exceptionErrors.throwForbiddenError('not verified user')),
    ).toPromise();
  }
}