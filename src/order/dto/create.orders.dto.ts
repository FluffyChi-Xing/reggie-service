import { IsNotEmpty } from 'class-validator';

export class CreateOrdersDto {
  status: number;
  number: number;
  @IsNotEmpty({
    message: '用户id不能为空',
  })
  user_id: number;
  @IsNotEmpty({
    message: '订单地址不能为空',
  })
  address_book_id: number;
  order_time: Date;
  pay_method: number;
  amount: number;
  remark: string;
  phone: string;
  address: string;
  username: string;
  consignee: string;
}
