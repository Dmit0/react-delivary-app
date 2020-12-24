import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Meal } from '../../../../meals/meal/models/meals.schema';
import { Cart } from './cart.schema';

@Schema()
export class cartMealItem extends Document {
  @Prop({ default: 1 })
  count: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Meal', required: true })
  mealId: Meal;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Cart', required: true })
  cartId: Cart;
}

export const CartMealItemSchema = SchemaFactory.createForClass(cartMealItem);