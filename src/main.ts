import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './winsdon/MyLogger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //允许跨域
  app.enableCors();
  //引入validation
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new MyLogger());
  //引入swagger 生成api文档
  const config = new DocumentBuilder()
    .setTitle('Reggie Take-Away APIs')
    .setDescription('The API documentation')
    .setVersion('v0.1')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  //引入nest config
  const configService = new ConfigService();
  await app.listen(configService.get('reggie_server_port'));
}
bootstrap();
