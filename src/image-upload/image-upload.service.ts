import { HttpStatus, Injectable } from '@nestjs/common';
import * as Client from 'ali-oss';
import * as dayjs from 'dayjs';

@Injectable()
export class ImageUploadService {
  //处理客户端请求签名
  async getSignature() {
    try {
      const config = {
        //key id
        accessKeyId: 'LTAI5tC4aZAt5muKPmGqg1if',
        //access key
        accessKeySecret: 'R6aIISQDqCXfM6w2zgNNgLG2kG5brc',
        //bucket name
        bucket: 'nest-upload-oss',
        //storage dir
        dir: 'images/',
      };
      const client = new Client(config);
      //设置签名的策略
      const date = new Date();
      date.setDate(date.getDate() + 1);
      //设置签名有效期，格式为unix时间戳
      const policy = {
        expiration: date.toISOString(),
        conditions: [
          ['content-length-range', 0, 10485760000], // 设置上传文件的大小限制
        ],
      };
      // 生成签名，策略等信息
      const formData = await client.calculatePostSignature(policy);
      // 生成 bucket 域名，客户端将向此地址发送请求
      const location = await client.getBucketLocation();
      const host = `http://${config.bucket}.${location.location}.aliyuncs.com`;
      // 响应给客户端的签名和策略等信息
      return {
        code: HttpStatus.OK,
        message: '成功获取签名',
        expire: dayjs().add(1, 'days').unix().toString(),
        policy: formData.policy,
        signature: formData.Signature,
        accessId: formData.OSSAccessKeyId,
        host,
        dir: config.dir,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '签名获取错误',
        data: e,
      };
    }
  }
}
