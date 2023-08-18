import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, ObjectId } from 'mongoose';

export type CuoupleDocument = HydratedDocument<Couple>;
@Schema({ timestamps: false })
export class Couple {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Transform(({ value }) => value.toString())
  createBy: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  slug: string;

  @Prop({ required: false })
  imagePath: string;

  @Prop({ required: false })
  imageName: string;

  @Prop({ required: false })
  gallery: [{
    imagePath: string;
    imageName: string;
  }];
}

export const CoupleSchema = SchemaFactory.createForClass(Couple);
