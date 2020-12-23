import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../../../auth/strategies/jwt.stratage';
import { MealModule } from '../../../meals/meal/meals.module';
import { Address, AddressSchema } from '../address/models/address.model';
import { CountryModule } from '../country/country.module';
import { UserModule } from '../user/user.module';
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
    MealModule
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
