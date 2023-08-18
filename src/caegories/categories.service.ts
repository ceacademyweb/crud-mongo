import { Injectable } from '@nestjs/common';
import { CreateCaegoryDto } from './dto/create-category.dto';
import { UpdateCaegoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/caegory.entity';
import { Model } from 'mongoose';


const sinDiacriticos = (function(){
    let de = 'ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç',
         a = 'AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc',
        re = new RegExp('['+de+']' , 'ug');

    return texto =>
        texto.replace(
            re,
            match => a.charAt(de.indexOf(match))
        );
})();

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>,){}
  create(createCaegoryDto: CreateCaegoryDto) {
    const newCategory = new this.categoryModel(createCaegoryDto);
    const slug = sinDiacriticos(createCaegoryDto.name).replace(/\s+/g, '-').toLowerCase();
    newCategory.slug = slug;
    return newCategory.save();
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(id: string) {
    console.log(id);
    return this.categoryModel.findOne({slug: id}).exec();
  }

  update(id: number, body: UpdateCaegoryDto) {
    const slug = sinDiacriticos(body.name).replace(/\s+/g, '-').toLowerCase();
    body.slug = slug;
    return this.categoryModel.findByIdAndUpdate(id, body, {new: true}).exec();
  }

  remove(id: number) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
