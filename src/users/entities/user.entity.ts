import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;


  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true, select:false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({select:false})
  text:string
}

export const UserSchema = SchemaFactory.createForClass(User);
