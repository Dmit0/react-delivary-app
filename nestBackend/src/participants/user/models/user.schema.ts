import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum UserStatuses {
  BLOCKED = 'blocked',
  ACTIVE = 'active',
  DEACTIVATED = 'deactivated',
}

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

  @Prop()
  createdAt: string;

  // @Prop({
  //   type: 'enum',
  //   enum: UserStatuses,
  //   default: UserStatuses.ACTIVE,
  // })
  // status: UserStatuses;

  @Prop()
  role: { type: Types.ObjectId, ref: 'Role' };

  @Prop()
  ownership: [{ type: Types.ObjectId, ref: 'Restaurant' }];

  @Prop()
  lovedRestaurant: [{ type: Types.ObjectId, ref: 'Restaurant' }];

  @Prop()
  cart: [{ type: Types.ObjectId, ref: 'Meal' }];

}

export const UserSchema = SchemaFactory.createForClass(User);