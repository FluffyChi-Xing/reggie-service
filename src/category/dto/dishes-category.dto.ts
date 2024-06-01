import { IsNotEmpty } from 'class-validator';

export class DishesDto {
  @IsNotEmpty({
    message: '分类名不能为空',
  })
  name: string;
  @IsNotEmpty({
    message: '排序方法不可为空',
  })
  sort: number;
  @IsNotEmpty({
    message: '分类类型不可为空',
  })
  type: number; //1 代表菜品分类
}
