import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({ require: true })
  country: string;
  @Prop({ require: true, default: null })
  city: string;
  @Prop({ require: true, default: null })
  street: string;
  @Prop({ require: true, default: null })
  streetNumber: string;
  @Prop({ require: true, default: null })
  name: string;
  @Prop({ require: true, default: null })
  floor: string;
  @Prop({ require: true, default: null })
  door: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);