import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entity/orders.entity';
import { User } from '../user/entity/user.entity';
import { Shopping_cart } from '../shopping_cart/entity/shopping_cart.entity';
import { CreateOrdersDto } from './dto/create.orders.dto';
import { Order_detail } from './entity/order_detail';
import { Amount } from './entity/todayAmount.entity';
import { CancelOrderDto } from './dto/cancel.order.dto';

@Injectable()
export class OrderService {
  //注入orders entity
  @InjectRepository(Orders)
  private ordersEntity: Repository<Orders>;
  //注入user entity
  @InjectRepository(User)
  private userEntity: Repository<User>;
  //注入cart entity
  @InjectRepository(Shopping_cart)
  private cartEntity: Repository<Shopping_cart>;
  //注入order detail entity
  @InjectRepository(Order_detail)
  private detailEntity: Repository<Order_detail>;
  //注入amount entity
  @InjectRepository(Amount)
  private amountEntity: Repository<Amount>;
  //默认地址-id对应关系
  area = [
    '中央大街秋林大厦',
    '中国巴洛克风格建筑区19号',
    '太阳岛辽宁省电视台',
    '神州大厦A座',
    '哈尔滨工业大学中俄合作办学校区',
    '道理菜市场一区',
  ];
  //用户下单
  async createOrders(order: CreateOrdersDto) {
    try {
      const orders = new Orders();
      orders.user_id = order.user_id;
      //查询购物车的总价格/下单时间
      const totalAmount = await this.cartEntity.findOne({
        where: {
          user_id: order.user_id,
        },
        order: {
          create_time: 'DESC',
        },
      });
      //查询用户名
      const user = await this.userEntity.findOne({
        where: {
          id: order.user_id,
        },
      });
      //得到当前order 的id
      const now_id = (await this.ordersEntity.count()) + 1;
      //下单地址id
      orders.address_book_id = order.address_book_id;
      //下单方式
      orders.pay_method = 1;
      //订单总价
      orders.amount = totalAmount.amount;
      orders.order_time = totalAmount.create_time;
      //用户名
      orders.username = user.name;
      //用户地址
      orders.address = this.area[order.address_book_id - 1];
      //手机号
      orders.phone = user.phone;
      await this.ordersEntity.save(orders);
      //同步写入order_detail表
      const details = new Order_detail();
      details.order_id = now_id;
      details.amount = totalAmount.amount;
      details.dish_id = totalAmount.dish_id;
      details.setmeal_id = totalAmount.setmeal_id;
      details.dish_flavor = totalAmount.dish_flavor;
      await this.detailEntity.save(details);
      return {
        code: HttpStatus.OK,
        message: '下单成功',
        data: {},
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //管理员销单
  async finishOrder(order_id: number, employee_id: number) {
    try {
      //查询 单号
      const order = await this.ordersEntity.findOne({
        where: {
          id: order_id,
        },
      });
      if (!order) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误,单号不存在',
        };
      }
      if (order.status === 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误,单号已完成',
        };
      }
      if (order.status === -1) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误,未接受订单',
        };
      }
      await this.ordersEntity.update(
        {
          id: order_id,
        },
        {
          status: 0, //0表示订单完成
        },
      );
      await this.amountEntity.update(
        {
          employee_id: employee_id,
        },
        {
          finish_order_number: +1,
        },
      );
      await this.amountEntity.increment(
        {
          employee_id: employee_id,
        },
        'amount',
        order.amount,
      );
      return {
        code: HttpStatus.OK,
        message: '订单已完成',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //取消接单
  async cancelOrder(cancel: CancelOrderDto) {
    try {
      const order = await this.ordersEntity.findOne({
        where: {
          id: cancel.order_id,
        },
      });
      if (!order) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误,订单不存在',
        };
      }
      if (order.status === 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '订单已完成',
        };
      }
      await this.ordersEntity.update(
        {
          id: cancel.order_id,
        },
        {
          status: -1,
        },
      );
      return {
        code: HttpStatus.OK,
        message: '取消接单',
      };
      if (cancel.employee_id) {
        await this.amountEntity.update(
          {
            employee_id: cancel.employee_id,
          },
          {
            cancel_order_number: +1,
          },
        );
      }
      return {
        code: HttpStatus.OK,
        message: '操作成功',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //分页拉取订单
  async pullOrder(pageNo: number, pageSize: number) {
    try {
      if (pageNo <= 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '页码不可小于等于0',
        };
      }
      const skipCount = (pageNo - 1) * pageSize;
      const [result, totalCount] = await this.ordersEntity.findAndCount({
        skip: skipCount,
        take: pageSize,
      });
      return {
        code: HttpStatus.OK,
        message: '拉取成功',
        data: result,
        count: totalCount,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //根据订单号查询单一订单
  async searchOne(id: number) {
    try {
      const result = await this.ordersEntity.findOne({
        where: {
          id: id,
        },
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误,订单不存在',
        };
      }
      return {
        code: HttpStatus.OK,
        message: '查询成功',
        data: [result],
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
}
