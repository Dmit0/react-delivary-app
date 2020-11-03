import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Country extends Document {
  @Prop({ require: true })
  name: string;

  @Prop({ require: true })
  dial_cod: string;

  @Prop({ require: true })
  country_cod: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);