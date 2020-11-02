import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Phone extends Document {
  @Prop({ require: true })
  code: string;

  @Prop({ require: true, unique: true })
  phoneNumber: string;

  @Prop({ require: true, default: false })
  isConfirmed: boolean;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);