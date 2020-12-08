import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/models/user.schema';

@Schema()
export class Phone extends Document {
  @Prop({ require: true })
  code: string;

  @Prop({ require: true, unique: true })
  phoneNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null })
  userId: User;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);