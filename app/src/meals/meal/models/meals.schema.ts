import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Restaurant } from '../../../restaurant/models/restaurant.schema';

@Schema()
export class Meal extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  working_time: string;

  @Prop({ require: true })
  picture: string;

  @Prop({ require: true })
  price: string;

  @Prop({ default: 1 })//переделать
  count: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Restaurant' })
  restaurant: Restaurant;

}

export const MealSchema = SchemaFactory.createForClass(Meal);