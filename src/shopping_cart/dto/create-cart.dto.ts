import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty({
    message: '用户id不能为空',
  })
  user_id: number;
  image: string;
  dish_id: number;
  setmeal_id: number;
  name: string;
  dish_flavor: string;
  amount: number;
}
