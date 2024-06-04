import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { ShoppingCartController } from './shopping_cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shopping_cart } from './entity/shopping_cart.entity';
import { Dish } from '../dish/entities/dish.entity';
import { User } from '../user/entity/user.entity';
import { SetMeal } from '../set-meal/entities/setmeal.entity';
import { Dish_Flavor } from '../flavor/entities/flavor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shopping_cart, Dish, User, SetMeal, Dish_Flavor]),
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
