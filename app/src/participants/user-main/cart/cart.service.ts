import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Action } from '../../../constants/enums/cart';
import { MealService } from '../../../meals/meal/meals.service';
import { RestaurantService } from '../../../restaurant/restaurant.service';
import { Cart } from './models/cart.schema';
import { cartMealItem } from './models/cartMealItem.schema';

@Injectable()
export class CartService {
  constructor(
    private readonly mealService: MealService,
    private readonly restaurantService: RestaurantService,
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

  getCart(criteria: any): Observable<Cart> {
    return from(this.cartModel.findOne(criteria)).pipe(
      map((cart) => cart || null),
    );
  }

  setItemInCart(userId: any, mealId: any) {
    return forkJoin([
      this.mealService.getMeal({ _id: mealId }),
      this.getCart({ userId }),
    ]).pipe(
      mergeMap(([ meal, cart ]) => this.getCartMealItem(mealId, cart._id).pipe(
        mergeMap((mealItem) => {
          if (mealItem && mealId == mealItem.mealId) {
            return this.updateCartMealItem({ _id: mealItem._id }, { count: mealItem.count + 1 }).pipe(
              mergeMap(() => this.updateCart({ _id: cart._id }, { countOfItems: cart.countOfItems + 1 })),
            );
          }
          return this.generateCartMealItem(mealId, cart._id, meal.restaurant).pipe(
            mergeMap((item) => this.updateCart({ _id: cart._id }, {
              meals: [ ...cart.meals, item._id ],
              countOfItems: cart.countOfItems + 1,
            })),
          );
        }),
      )),
    );
  }

  changeItemInCart(userId, mealId, action: Action) {
    return this.getCart({ userId }).pipe(
      mergeMap((cart) => {
        return this.getCartMealItem(mealId, cart._id).pipe(
          mergeMap((cartMealItem) => {
              if (cartMealItem.count === 1 && action === Action.DECREMENT) {
                return this.deleteMealFromCart(userId, mealId);
              }
              return this.updateCart({ _id: cart._id }, { countOfItems: cart.countOfItems + CartService.getAction(action) }).pipe(
                mergeMap(() => this.updateCartMealItem({ _id: cartMealItem._id }, { count: cartMealItem.count + CartService.getAction(action) }),
                ));
            },
          ),
        );
      }),
    );
  }

  private static getAction (action: Action): number {
    switch (action) {
      case Action.DECREMENT:
        return -1
      case Action.INCREMENT:
        return 1
    }
  }

  deleteMealFromCart(userId, mealId) {
    return this.getCart({ userId }).pipe(
      mergeMap((cart) => this.getCartMealItem(mealId, cart._id).pipe(
        mergeMap((mealItem) => this.updateCart({ _id: cart._id }, {
          meals: cart.meals.filter((item) => item !== mealId),
          countOfItems: cart.countOfItems - mealItem.count,
        }).pipe(
          mergeMap(() => this.deleteMealItem(mealId)),
        )),
      )),
    );
  }

  private deleteMealItem(mealId): Observable<any> {
    return from(this.cartMealItemModel.remove({ mealId }))
  }

  deleteManyMealItems(cartId: any): Observable<any> {
    return from(this.cartMealItemModel.deleteMany({ cartId }))
  }

  cleanCart(userId) {
    return this.getCart({ userId }).pipe(
      mergeMap((cart) => forkJoin([
        this.updateCart({ _id: cart._id }, { meals: [], countOfItems: 0 }),
        this.deleteManyMealItems(cart._id),
      ])),
    );
  }

  getCartUserItems(userId) {
    return this.getCart({ userId }).pipe(
      mergeMap((cart) => this.getUserMealsByIds(cart._id)));
  }

  private getUserMealsByIds(cartId: any) {
    return from(this.cartMealItemModel.find({ cartId })).pipe(
      mergeMap((mealItems) => {
        const restaurantIds = mealItems.map(item => item.restaurantId)
        const mealIds = mealItems.map((item) => item.mealId);
        return this.restaurantService.getRestaurantByIds(restaurantIds).pipe(
          mergeMap(restaurants => this.mealService.getMealsByIds(mealIds).pipe(
            mergeMap(meals => {
              return of({
                meals: meals.map(meal => {
                  const userMeal = mealItems.find(mealCart => mealCart.mealId.equals(meal._id));
                  return {
                    meal,
                    count: userMeal.count,
                    restaurant: userMeal.restaurantId
                  }
                }),
                restaurants
              })
            })
          ))
        )
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

  private generateCartMealItem(mealId: any, cartId: any, restaurantId): Observable<cartMealItem> {
    const newItem = new this.cartMealItemModel({ mealId, cartId, restaurantId });
    return from(newItem.save()).pipe(
      map((item) => item || null),
    );
  }
}
