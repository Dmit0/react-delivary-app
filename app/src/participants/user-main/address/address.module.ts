import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from '../country/models/country.schema';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address, AddressSchema } from './models/address.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  providers: [AddressService],
  controllers: [AddressController],
  exports: [AddressService]

})
export class AddressModule {}
