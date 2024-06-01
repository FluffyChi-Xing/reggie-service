import { RegisterDto } from './employee-register.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDto extends RegisterDto {
  @IsNotEmpty({
    message: '身份名不可为空',
  })
  name: string;
}
