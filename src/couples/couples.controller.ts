import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, Put, NotFoundException, } from '@nestjs/common';
import { CouplesService } from './couples.service';
import { CreateCoupleDto } from './dto/create-couple.dto';
import { UpdateCoupleDto } from './dto/update-couple.dto';
import { FileInterceptor, FilesInterceptor, } from '@nestjs/platform-express';



@Controller('couples')
export class CouplesController {
  constructor(private readonly couplesService: CouplesService) { }


  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() body: CreateCoupleDto, @UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: /(jpg|jpeg|png|gif)$/ ,
    })
    .addMaxSizeValidator({
      maxSize: 1000000
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),
  ) file: Express.Multer.File) {
    console.log(body);
    // if(!file) throw new NotFoundException(`Debe agregar una imágen`);
    return this.couplesService.create(body, file);
  }

  @Post(':id/gallery')
  @UseInterceptors(FilesInterceptor('files'))
  async createGalery(@Param('id') id: number ,@Body() body: any, @UploadedFiles(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: /(jpg|jpeg|png|gif)$/ ,
    })
    .addMaxSizeValidator({
      maxSize: 1000000
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),
  ) files: Array<Express.Multer.File>) {
    if(!files) throw new NotFoundException(`Debe agregar almenos una imágen`);
    return this.couplesService.createGallery(id, files);
  }

  //  @Post('/:id/gallery')
  //  addGallery(@Param('id') id: string, @Body() body: any) {

  //  }

  @Get()
  findAll() {
    return this.couplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.couplesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateCoupleDto) {
    return this.couplesService.update(id, body);
  }

  // @Put('/image/:id')
  // @UseInterceptors(FileInterceptor('file'))
  // async updateImage(@Body() body: any, @UploadedFile(
  //   new ParseFilePipeBuilder()
  //   .addFileTypeValidator({
  //     fileType: /(jpg|jpeg|png|gif)$/ ,
  //   })
  //   .addMaxSizeValidator({
  //     maxSize: 1000000
  //   })
  //   .build({
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  //   }),
  // ) file: Express.Multer.File) {
  //   return this.couplesService.updateImage(body, file);
  // }




  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.couplesService.remove(id);
  }
}
