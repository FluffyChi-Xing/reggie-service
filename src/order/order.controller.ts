import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrdersDto } from './dto/create.orders.dto';
import { LoginGuard } from '../common/guard/login-guard.guard';
import { CancelOrderDto } from './dto/cancel.order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  //用户下单，将购物车的数据写入订单库，并将用户当前的地址加入数据库
  @Post('create')
  async createOrders(@Body() order: CreateOrdersDto) {
    return await this.orderService.createOrders(order);
  }
  //管理员销单
  @Get('finish')
  @UseGuards(LoginGuard)
  async finishOrder(
    @Query('id') id: number,
    @Query('employee_id') employee_id: number,
  ) {
    return await this.orderService.finishOrder(id, employee_id);
  }
  //取消订单
  @Post('cancel')
  async cancelOrder(@Body() cancel: CancelOrderDto) {
    return await this.orderService.cancelOrder(cancel);
  }
  //管理员拉取订单
  @Get('pull')
  @UseGuards(LoginGuard)
  async pullOrders(
    @Query('pageSize') pageSize: number,
    @Query('pageNo') pageNo: number,
  ) {
    return await this.orderService.pullOrder(pageNo, pageSize);
  }
  //管理员查询订单
  @Get('search')
  @UseGuards(LoginGuard)
  async searchOrder(@Query('id') id: number) {
    return await this.orderService.searchOne(id);
  }
}
