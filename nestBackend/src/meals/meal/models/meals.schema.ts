import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  @Prop()
  restaurant: { type: Types.ObjectId, ref: 'Restaurant' };

}

export const MealSchema = SchemaFactory.createForClass(Meal);