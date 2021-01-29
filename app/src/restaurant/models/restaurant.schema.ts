import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Days } from '../../constants/enums/day.enum';
import { Meal } from '../../meals/meal/models/meals.schema';
import { User } from '../../participants/user-main/user/models/user.schema';

@Schema()
export class Restaurant extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  working_time: string;

  @Prop({ require: true })
  description: string;

  @Prop({ require: true })
  picture: string;

  @Prop({ default: 0 })
  minSumOfDelivery: number

  @Prop({ require: true })
  openTime: Date

  @Prop({ require: true })
  closeTime: Date

  @Prop({ require: true })
  notWorkingDays: [Days]

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Meal' })
  meals: [Meal];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  saved: [User];

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);