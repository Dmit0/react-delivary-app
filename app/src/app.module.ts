import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config, ENV_VAR } from '../config';
import { BannerModule } from './advertisement/banner/banner.module';
import { AuthModule } from './auth/auth.module';
import { CuisineModule } from './meals/cuisen/cuisen.module';
import { MealModule } from './meals/meal/meals.module';
import { UserModule } from './participants/user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';



@Module({
  imports: [
    RestaurantModule,
    UserModule,
    MealModule,
    CuisineModule,
    AuthModule,
    BannerModule,
    ConfigService,// how to use it?
    ConfigModule.forRoot({
      load: [config],
    }),
    MongooseModule.forRoot(ENV_VAR.mongoDb.url),
  ],
})
export class AppModule {
}