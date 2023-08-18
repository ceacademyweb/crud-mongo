import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCoupleDto {

  @IsString()
  name: string;

  @IsString()
  createBy: {};

  @IsString()
  description: string;

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
