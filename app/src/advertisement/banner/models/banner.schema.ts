import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Banner extends Document {
  @Prop({ require: true, unique: true })
  name: string;
  @Prop({ require: true, unique: true })
  picture: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);