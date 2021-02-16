import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Restaurant } from '../../../restaurant/models/restaurant.schema';

@Schema()
export class Meal extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  picture: string;

  @Prop({ require: true })
  price: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Restaurant' })
  restaurant: Restaurant;

}

export const MealSchema = SchemaFactory.createForClass(Meal);