import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Role } from '../../../constants/Entity/Roles';
import { Meal } from '../../../meals/meal/models/meals.schema';
import { Restaurant } from '../../../restaurant/models/restaurant.schema';

export const UserStatuses = [
  'BRONZE',
  'SILVER',
  'GOLD',
  'ADMIN'
]

@Schema()
export class User extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true, unique: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop({ require: true })
  telephone: string;

  @Prop({default:Date.now()})
  createdAt: string;

  @Prop({
    enum: UserStatuses,
    default: UserStatuses[0],
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role'})
  role: Role;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Restaurant', default:null })
  ownership: [Restaurant];

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', default:[] })
  lovedRestaurant: [Restaurant];

  @Prop({ type: Types.ObjectId, ref: 'Meal', default:[] })
  cart: [Meal];

}

export const UserSchema = SchemaFactory.createForClass(User);