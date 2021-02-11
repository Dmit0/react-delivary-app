import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealModule } from '../../../meals/meal/meals.module';
import { RestaurantModule } from '../../../restaurant/restaurant.module';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart, CartSchema } from './models/cart.schema';
import { cartMealItem, CartMealItemSchema } from './models/cartMealItem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: cartMealItem.name, schema: CartMealItemSchema },
    ]),
    MealModule,
    RestaurantModule
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
