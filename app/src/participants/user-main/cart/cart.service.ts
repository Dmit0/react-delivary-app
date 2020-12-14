import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Action } from '../../../constants/enums/cart';
import { Cart } from './models/cart.schema';
import { cartMealItem } from './models/cartMealItem.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(cartMealItem.name) private cartMealItemModel: Model<cartMealItem>,
  ) {
  }

  generateCart(data: { userId: any }): Observable<Cart> {
    const newCart = new this.cartModel({ ...data });
    return from(newCart.save()).pipe(
      map((cart) => cart || null)
    )
  }
  getCart(userId: any): Observable<Cart> {
    return from(this.cartModel.findOne(userId)).pipe(
      map((cart) => cart || null),
    );
  }

  setItemInCart(userId: any,mealId: any) {
    return from(this.generateCartMealItem(mealId, userId)).pipe(
      mergeMap((cartMealItem) => this.getCart(userId).pipe(
        mergeMap((cart) => this.updateCart({ _id: cart._id }, { meals: [...cart.meals, cartMealItem._id] }).pipe(
          map((cart) => cart || null)
        ))
      ))
    )
  }

  changeItemInCart(userId, mealId, action: Action) {
    return from(this.getCart(userId)).pipe(
      mergeMap((cart) => {
        return from(this.getCartMealItem(mealId, cart._id)).pipe(
          mergeMap((cartMealItem) => this.updateCartMealItem({ _id: cartMealItem._id },
            {
              count: action === Action.INCREMENT
                ? cartMealItem.count++
                : cartMealItem.count--,
            })),
        );
      }),
    );
  }

  getCartMealItem(mealId, cartId): Observable<cartMealItem> {
    return from(this.cartMealItemModel.findOne({ mealId, cartId })).pipe(
      map((cartItem) => cartItem || null)
    )
  }

  updateCartMealItem(options, data): Observable<cartMealItem> {
    return from(this.cartMealItemModel.updateOne(options, data)).pipe(
      map((cartMealItem) => cartMealItem || null),
    );
  }

  updateCart(options, data): Observable<Cart> {
    return from(this.cartModel.updateOne(options, data)).pipe(
      map((cart) => cart || null),
    );
  }

 private generateCartMealItem(mealId: any, cartId: any): Observable<cartMealItem> {
    const newItem = new this.cartMealItemModel({ mealId, cartId });
    return from(newItem.save()).pipe(
      map((item) => item || null),
    );
  }
}
