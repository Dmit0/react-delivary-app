import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/models/user.schema';

@Schema()
export class Address extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({ require: true })
  country?: string;
  @Prop({ default: null })
  city?: string;
  @Prop({ default: null })
  street?: string;
  @Prop({ default: null })
  streetNumber?: string;
  @Prop({ default: null })
  floor?: string;
  @Prop({ default: null })
  door?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);