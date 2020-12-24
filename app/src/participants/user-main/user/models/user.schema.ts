import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Address } from '../../address/models/address.model';
import { Cart } from '../../cart/models/cart.schema';
import { Phone } from '../../phone/models/phone.schema';
import { Role } from '../../roles/models/Roles';
import { Meal } from '../../../../meals/meal/models/meals.schema';
import { Restaurant } from '../../../../restaurant/models/restaurant.schema';

export const UserStatuses = [
  'BRONZE',
  'SILVER',
  'GOLD',
  'ADMIN',
];

@Schema()
export class User extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true, unique: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Phone', default: null })
  telephone: Phone;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({
    enum: UserStatuses,
    default: UserStatuses[0],
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ type:[MongooseSchema.Types.ObjectId], ref: 'Restaurant', default: null })
  ownership: [ Restaurant ];

  @Prop({ type:[MongooseSchema.Types.ObjectId], ref: 'Restaurant', default: [] })
  lovedRestaurant: [ Restaurant ];

  @Prop({ type:MongooseSchema.Types.ObjectId, ref: 'Cart' })
  cart: Cart;

  @Prop({ type:[MongooseSchema.Types.ObjectId], ref: 'Address', default: [] })
  addresses: [ Address ];

}

export const UserSchema = SchemaFactory.createForClass(User);