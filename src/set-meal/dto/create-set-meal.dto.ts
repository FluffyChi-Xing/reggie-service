import { IsNotEmpty } from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty({
    message: '套餐名不可为空',
  })
  name: string;
  @IsNotEmpty({
    message: '分类id不可为空',
  })
  category_id: number;
  status: number;
  @IsNotEmpty({
    message: '价格不可为空',
  })
  price: number;
  code: string;
  description: string;
  image: string;
}
