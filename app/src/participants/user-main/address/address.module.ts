import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from '../country/country.module';
import { UserModule } from '../user/user.module';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address, AddressSchema } from './models/address.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
    ]),
    CountryModule
  ],
  providers: [AddressService],
  controllers: [AddressController],
  exports: [AddressService]

})
export class AddressModule {}
