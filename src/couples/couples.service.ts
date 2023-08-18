import { Injectable } from '@nestjs/common';
import { CreateCoupleDto } from './dto/create-couple.dto';
import { UpdateCoupleDto } from './dto/update-couple.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Couple } from './entities/couple.entity';
import { Model } from 'mongoose';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

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
export class CouplesService {

constructor(
    @InjectModel(Couple.name) private coupleModel: Model<Couple>
  ) {
  }

  async create(body: CreateCoupleDto, file: Express.Multer.File){
    console.log(body, file)
    const upload = new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
    const res:any = await upload
    console.log(res)
    const createdCoumple = new this.coupleModel(body);
    const text = sinDiacriticos(body.name)
    let slug = text.replace(/\s+/g, '-').toLowerCase();
    createdCoumple.imagePath = res.secure_url;
    createdCoumple.imageName = res.public_id;
    createdCoumple.slug = slug;
    console.log(createdCoumple)
    return createdCoumple.save();
  }
  async createGallery(id: number, files: Array<Express.Multer.File>){
    const couple = await this.coupleModel.findById(id).exec();
    const coupleGallery= couple.gallery;
    const gallery = []
    for (const file of files) {
      const upload = new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });

        toStream(file.buffer).pipe(upload);
      });
      const res:any = await upload
      const obj={
        imagePath: res.secure_url,
        imageName: res.public_id,
      }
      coupleGallery.push(obj)
    }
    return this.coupleModel.findByIdAndUpdate(id, {gallery:coupleGallery}, { new: true });
  }

  async findAll() {
    return this.coupleModel.find();
  }

  findOne(id: string) {
    return this.coupleModel.findOne({slug: id}).exec();
  }

  update(id: number, updateCoupleDto: UpdateCoupleDto) {
    if(updateCoupleDto.name){
      const text = sinDiacriticos(updateCoupleDto.name)
      let slug = text.replace(/\s+/g, '-').toLowerCase();
      updateCoupleDto.slug = slug;

    }
    return this.coupleModel.findByIdAndUpdate(id, updateCoupleDto, { new: true });
  }

  async remove(id: number) {
    const couple = await this.coupleModel.findById(id).exec();
    const images = []
    images.push(couple.imageName)
    const gallery = couple.gallery
    for (const image of gallery) {
      images.push(image.imageName)
    }
    try{
      images.forEach(img=>{
        v2.uploader.destroy(img, function(result) {console.log('imgen borrada')});

      })
      await this.coupleModel.findByIdAndDelete(id);
      return {code:200, status: "success", message: 'Producto eliminado correctamente'}

    }catch(error){
      return {code:401, status: "error", error: 'No se ha seleccionado un archivo'};
    }
  }
}
