import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from '../../roles/models/Roles';

@Schema()
export class Opportunity extends Document {
  @Prop({ require: true, unique: true, default:"base" })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Opportunities', default:null })
  representative:[Role]
}

export const OpportunitySchema = SchemaFactory.createForClass(Opportunity);