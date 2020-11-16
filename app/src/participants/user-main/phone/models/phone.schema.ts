import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Phone extends Document {
  @Prop({ require: true })
  code: string;

  @Prop({ require: true, unique: true })
  phoneNumber: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);