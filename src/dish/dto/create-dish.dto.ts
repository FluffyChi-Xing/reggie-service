import { IsNotEmpty } from 'class-validator';

export class CreateDishDto {
  @IsNotEmpty({
    message: '品名不能为空',
  })
  name: string;
  @IsNotEmpty({
    message: '分类id不能为空',
  })
  category_id: number;
  price: number;
  @IsNotEmpty({
    message: '菜品代号不能为空',
  })
  code: string;
  @IsNotEmpty({
    message: '菜品图片不能为空',
  })
  image: string;
  description: string;
  @IsNotEmpty({
    message: '菜品状态不能为空',
  })
  status: number;
  @IsNotEmpty({
    message: '排序方式不能为空',
  })
  sort: number;
}
