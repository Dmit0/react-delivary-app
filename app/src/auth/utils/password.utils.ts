import { from, Observable, of } from 'rxjs';
import * as bcrypt from 'bcrypt'

export class passwordUtils {
  static hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  static comparePassword(hashPasswordToCompare: string, basicPassword: string): Observable<boolean> {
    return from(bcrypt.compare(basicPassword, hashPasswordToCompare));//чекнуть что возвращает bool?
  }
}