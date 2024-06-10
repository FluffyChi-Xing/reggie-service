import { IsNotEmpty } from 'class-validator';

export class UpdateSetMealDto {
  @IsNotEmpty({
    message: '套餐名不能为空',
  })
  name: string;
  price: number;
  status: number;
  category_id: number;
  description: string;
  image: string;
}
