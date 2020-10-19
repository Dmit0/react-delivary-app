import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://sheshunov00:h387rqy834grif@cluster0.qb2dz.azure.mongodb.net/react-delivary-app?retryWrites=true&w=majority'),
  ],
})
export class AppModule {
}