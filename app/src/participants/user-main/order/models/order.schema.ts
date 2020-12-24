import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { cartMealItem } from '../../cart/models/cartMealItem.schema';
import { User } from '../../user/models/user.schema';

@Schema()
export class Order extends Document {
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'cartMealItem', required: true  })
  meals: cartMealItem[];

  @Prop({ require: true, required: true })
  price: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);