import { Controller, Get } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';

@Controller('oss')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}
  //处理客户端请求签名
  @Get('signature')
  async getOssSignature() {
    return await this.imageUploadService.getSignature();
  }
}
