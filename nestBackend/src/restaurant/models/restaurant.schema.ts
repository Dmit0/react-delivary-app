import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Restaurant extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  working_time: string;//изменитть на дейт

  @Prop({ require: true })
  description: string;

  @Prop({ require: true })
  picture: string;

  @Prop()
  owner: { type: Types.ObjectId, ref: 'User' };

  @Prop()
  meals: [{ type: Types.ObjectId, ref: 'Meal' }];

  @Prop()
  saved: [{ type: Types.ObjectId, ref: 'User' }];

  @Prop()
  selItems: [{ type: Types.ObjectId, ref: 'SelItems' }];

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);