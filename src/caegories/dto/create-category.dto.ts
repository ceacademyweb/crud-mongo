import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCaegoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  slug: string;
}
