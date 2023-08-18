import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UseGuards(RoleGuard)
  create(@Body() body: CreateUserDto,) {
    if (body.password !== body.passwordRepeat)
      throw new NotFoundException(`Las contraseñas no coinciden`);
    return this.usersService.create(body);
  }

   @Get()
  // @UseGuards(RoleGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }



  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.password){
      if (updateUserDto.password !== updateUserDto.passwordRepeat){
        throw new NotFoundException(`Las contraseñas no coinciden`);
      }
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
