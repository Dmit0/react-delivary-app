import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {//переписать на рх
    return this.authService.verifyUser(({email, password})).pipe(
      map((verifyResult)=>{
        if(!verifyResult){
          throw new UnauthorizedException();
        }
        return verifyResult
      })
    ).toPromise()
  }
}