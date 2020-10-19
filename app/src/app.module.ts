import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerModule } from './src/advertisement /bunner/bunner.module';
import { AuthModule } from './src/auth/auth.module';
import { CuisineModule } from './src/meals/cuisen/cuisen.module';
import { MealModule } from './src/meals/meal/meals.module';
import { UserModule } from './src/participants/user/user.module';
import { RestaurantModule } from './src/restaurant/restaurant.module';


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