import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../../../auth/strategies/jwt.stratage';
import { AddressModule } from '../address/address.module';
import { Address } from '../address/models/address.model';
import { CartModule } from '../cart/cart.module';
import { CountryModule } from '../country/country.module';
import { PhoneModule } from '../phone/phone.module';
import { Role, RoleSchema } from '../roles/models/Roles';
import { RolesModule } from '../roles/roles.module';
import { User, UserSchema } from './models/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
    RolesModule,
    AddressModule,
    PhoneModule,
    CartModule
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports:[UserService]
})
export class UserModule {
}