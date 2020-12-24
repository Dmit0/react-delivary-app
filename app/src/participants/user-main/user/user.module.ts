import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../../../auth/strategies/jwt.stratage';
import { RestaurantModule } from '../../../restaurant/restaurant.module';
import { AddressModule } from '../address/address.module';
import { CartModule } from '../cart/cart.module';
import { PhoneModule } from '../phone/phone.module';
import { RolesModule } from '../roles/roles.module';
import { User, UserSchema } from './models/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    RolesModule,
    AddressModule,
    PhoneModule,
    CartModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {
}