import { PartialType } from '@nestjs/mapped-types';
import { CreateCoupleDto } from './create-couple.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCoupleDto extends PartialType(CreateCoupleDto) {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  gallery: string[];

  @IsOptional()
  @IsString()
  slug: string;
}
