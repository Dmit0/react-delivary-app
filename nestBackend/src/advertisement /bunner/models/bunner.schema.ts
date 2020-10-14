import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bunner extends Document {
  @Prop({ require: true, unique: true })
  picture: string;
}

export const BunnerSchema = SchemaFactory.createForClass(Bunner);