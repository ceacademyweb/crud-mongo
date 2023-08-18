import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, ObjectId } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
@Schema({ timestamps: true })
export class Category {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;


  @Prop({ trim: true, required: true, unique: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ trim: true })
  slug: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);
