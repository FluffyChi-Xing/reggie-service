import { LoginDto } from './employee-login.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterDto extends LoginDto {
  @IsNotEmpty({
    message: '电话号不可为空',
  })
  phone: string;
  @IsNotEmpty({
    message: '性别不可为空',
  })
  sex: string;
  @IsNotEmpty({
    message: '身份证号不可为空',
  })
  id_number: string;
  @IsNotEmpty({
    message: '状态不能为空',
  })
  status: number;
  name: string;
}
