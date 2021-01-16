import {
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BuyGuard extends AuthGuard('opportunity-buy') {
}