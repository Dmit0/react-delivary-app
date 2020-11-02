import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Meal' })
  meals: [Meal];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  saved: [User];

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  // selItems: [{ type: Types.ObjectId, ref: 'SelItems' }];

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);