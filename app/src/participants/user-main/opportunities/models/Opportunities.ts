import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Opportunity extends Document {
  @Prop({ require: true, unique: true, default:"base" })
  name: string;
}

export const OpportunitySchema = SchemaFactory.createForClass(Opportunity);