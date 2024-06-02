import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;
  @IsNotEmpty({
    message: '身份证不能为空',
  })
  id_number: string;
  @IsNotEmpty({
    message: '手机号不能为空',
  })
  phone: string;
  avatar: string;
}
