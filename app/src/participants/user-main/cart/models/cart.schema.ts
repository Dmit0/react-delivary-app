import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/models/user.schema';
import { cartMealItem } from './cartMealItem.schema';

@Schema()
export class Cart extends Document {
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'cartMealItem', default: []  })
  meals: cartMealItem[];

  @Prop({ require: true, default: 0 })
  price: string;

  @Prop({ require: true, default: 0 })
  countOfItems: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);