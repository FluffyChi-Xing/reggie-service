import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shopping_cart } from './entity/shopping_cart.entity';
import { Repository } from 'typeorm';
import { Dish } from '../dish/entities/dish.entity';
import { SetMeal } from '../set-meal/entities/setmeal.entity';
import { User } from '../user/entity/user.entity';
import { Dish_Flavor } from '../flavor/entities/flavor.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class ShoppingCartService {
  //注入cart entity
  @InjectRepository(Shopping_cart)
  private cartEntity: Repository<Shopping_cart>;
  //注入dish entity
  @InjectRepository(Dish)
  private dishEntity: Repository<Dish>;
  //注入set meal entity
  @InjectRepository(SetMeal)
  private setMeal: Repository<SetMeal>;
  //注入user entity
  @InjectRepository(User)
  private userEntity: Repository<User>;
  //注入 dish flavor entity
  @InjectRepository(Dish_Flavor)
  private flavorEntity: Repository<Dish_Flavor>;
  //添加商品到购物车
  async addCart(cart: CreateCartDto) {
    try {
      //检查用户是否存在
      const user = await this.userEntity.findOne({
        where: {
          id: cart.user_id,
        },
      });
      if (!user) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误，用户不存在',
        };
      }
      //检查菜品id是否存在
      //菜品价格
      let dishCount: number = 0;
      if (cart.dish_id) {
        const dish = await this.dishEntity.findOne({
          where: {
            id: cart.dish_id,
          },
        });
        if (!dish) {
          return {
            code: HttpStatus.BAD_REQUEST,
            message: '错误,菜品不存在',
          };
        }
        dishCount += dish.price;
      }
      //检查套餐id
      //套餐价格
      let mealCount: number = 0;
      if (cart.setmeal_id) {
        const set_meal = await this.setMeal.findOne({
          where: {
            id: cart.setmeal_id,
          },
        });
        if (!set_meal) {
          return {
            code: HttpStatus.BAD_REQUEST,
            message: '错误,套餐不存在',
          };
        }
        mealCount += set_meal.price;
      }
      /*
      //检查菜品风味id
      let dishFlavor: Dish_Flavor;
      if (cart.dish_flavor) {
        const flavor = await this.flavorEntity.findOne({
          where: {
            id: Number(cart.dish_flavor),
          },
        });
        if (!flavor) {
          return {
            code: HttpStatus.BAD_REQUEST,
            message: '错误,不存在该菜品风味',
          };
        }
        dishFlavor = await this.flavorEntity.findOne({
          where: {
            id: Number(cart.dish_flavor),
          },
        });
      }
       */
      const newCart = new Shopping_cart();
      newCart.user_id = cart.user_id;
      newCart.dish_id = cart.dish_id;
      newCart.image = cart.image;
      newCart.dish_flavor = '1';
      newCart.setmeal_id = cart.setmeal_id;
      newCart.amount = mealCount + dishCount;
      newCart.name = cart.name;
      await this.cartEntity.save(newCart);
      return {
        code: HttpStatus.OK,
        message: '添加成功',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //查看购物车
  async searchCart(id: number) {
    try {
      const cart = await this.cartEntity.findOne({
        where: {
          id: id,
        },
      });
      return {
        code: HttpStatus.OK,
        message: '查询成功',
        data: [cart],
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
