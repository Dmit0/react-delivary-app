import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Selitem extends Document {
  @Prop({ require: true, unique: true })
  name: string;
}

export const CuisineSchema = SchemaFactory.createForClass(Selitem);