import { PartialType } from '@nestjs/mapped-types';
import { CreateCaegoryDto } from './create-category.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCaegoryDto extends PartialType(CreateCaegoryDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  slug: string;

}
