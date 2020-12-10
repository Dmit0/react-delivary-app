import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/models/user.schema';

@Schema()
export class Address extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null })
  userId: User;
  @Prop({ require: true })
  country?: string;
  @Prop({ require: true })
  countryCode?: string;
  @Prop({ default: null })
  street?: string;
  @Prop({ default: null })
  streetNumber?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);