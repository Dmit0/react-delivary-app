import jwt from 'jsonwebtoken';
import { env } from '../../env';

export class TokenUtils {
  static verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET_KEY)
  }
}