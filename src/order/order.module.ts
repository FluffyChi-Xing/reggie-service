import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entity/orders.entity';
import { User } from '../user/entity/user.entity';
import { Shopping_cart } from '../shopping_cart/entity/shopping_cart.entity';
import { Order_detail } from './entity/order_detail';
import { Amount } from './entity/todayAmount.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orders,
      User,
      Shopping_cart,
      Order_detail,
      Amount,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
