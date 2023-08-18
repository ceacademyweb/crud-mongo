import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCaegoryDto } from './dto/create-category.dto';
import { UpdateCaegoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly caegoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCaegoryDto: CreateCaegoryDto) {
    return this.caegoriesService.create(createCaegoryDto);
  }

  @Get()
  findAll() {
    return this.caegoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caegoriesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCaegoryDto: UpdateCaegoryDto) {
    return this.caegoriesService.update(id, updateCaegoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.caegoriesService.remove(id);
  }
}
