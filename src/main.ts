import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './winsdon/MyLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //允许跨域
  app.enableCors();
  //引入validation
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new MyLogger());
  //引入nest config
  const configService = new ConfigService();
  await app.listen(configService.get('reggie_server_port'));
}
bootstrap();
