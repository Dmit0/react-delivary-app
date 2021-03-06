import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config, ENV_VAR } from '../config';
import { BannerModule } from './advertisement/banner/banner.module';
import { AuthModule } from './auth/auth.module';
import { CuisineModule } from './meals/cuisen/cuisen.module';
import { MealModule } from './meals/meal/meals.module';
import { AddressModule } from './participants/user-main/address/address.module';
import { CountryModule } from './participants/user-main/country/country.module';
import { OpportunitiesModule } from './participants/user-main/opportunities/opportunities.module';
import { OrderModule } from './participants/user-main/order/order.module';
import { PhoneModule } from './participants/user-main/phone/phone.module';
import { RolesModule } from './participants/user-main/roles/roles.module';
import { UserModule } from './participants/user-main/user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';



@Module({
  imports: [
    RestaurantModule,
    UserModule,
    MealModule,
    CuisineModule,
    AuthModule,
    AddressModule,
    BannerModule,
    RolesModule,
    PhoneModule,
    RolesModule,
    OpportunitiesModule,
    CountryModule,
    OrderModule,
    ConfigService,
    ConfigModule.forRoot({
      load: [config],
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
  ],
})
export class AppModule {
}