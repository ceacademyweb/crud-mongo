import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 5000);
  console.log(`Application is running on: ${await app.getUrl()}/${prefix}`);
}
bootstrap();
