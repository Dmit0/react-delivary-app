import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from '../address/address.module';
import { Address } from '../address/models/address.model';
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
    PhoneModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {
}