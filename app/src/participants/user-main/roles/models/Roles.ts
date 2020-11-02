import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Opportunity } from './Opportunities';

@Schema()
export class Role extends Document {
  @Prop({ require: true, unique: true, default:'BASE'})
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Opportunity', default:null })
  opportunities:[Opportunity]
}

export const RoleSchema = SchemaFactory.createForClass(Role);