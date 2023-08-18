import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
const saltOrRounds = 10;

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtTokenService: JwtService
  ) {
  }


  async create(body: CreateUserDto) {
    let randomNumber = require("random-number-csprng");
    const newUser = new this.userModel(body);
    const pass = newUser.password;
    newUser.password = await bcrypt.hash(pass, saltOrRounds);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password){
      updateUserDto.text = updateUserDto.password;
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, saltOrRounds);
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: number) : Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
