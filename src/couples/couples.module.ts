import { Module } from '@nestjs/common';
import { CouplesService } from './couples.service';
import { CouplesController } from './couples.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Couple, CoupleSchema } from './entities/couple.entity';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Couple.name, schema: CoupleSchema }]),
  ],
  controllers: [CouplesController],
  providers: [CloudinaryProvider,CouplesService]
})
export class CouplesModule {}
