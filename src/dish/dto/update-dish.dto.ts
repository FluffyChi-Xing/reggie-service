import { IsNotEmpty } from 'class-validator';

export class UpdateDishDto {
  @IsNotEmpty({
    message: '菜品名不可为空',
  })
  name: string;
  @IsNotEmpty({
    message: '价格不能为空',
  })
  price: number;
  sort: number;
  image: string;
  description: string;
  status: number;
}
