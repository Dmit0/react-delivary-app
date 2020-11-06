import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Country extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  dial_code: string;

  @Prop({ require: true })
  code: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);