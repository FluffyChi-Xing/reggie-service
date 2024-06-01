import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetMeal } from './entities/setmeal.entity';
import { CreateMealDto } from './dto/create-set-meal.dto';
import { BackMealVo } from './vo/backMeal.vo';

@Injectable()
export class SetMealService {
  //注入set-meal entity
  @InjectRepository(SetMeal)
  private mealEntity: Repository<SetMeal>;
  //分页查询套餐数据
  async findAll(pageNo: number, pageSize: number) {
    try {
      const skipCount = (pageNo - 1) * pageSize;
      const [result, totalCount] = await this.mealEntity.findAndCount({
        skip: skipCount,
        take: pageSize,
      });
      const list = [];
      const vo = new BackMealVo();
      result.forEach((item) => {
        vo.name = item.name;
        vo.code = item.code;
        vo.price = item.price;
        vo.status = item.status;
        vo.description = item.description;
        vo.category_id = item.category_id;
        list.push(vo);
      });
      return {
        code: HttpStatus.OK,
        message: '拉取成功',
        data: list,
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
  //新增套餐接口
  async createMeal(meal: CreateMealDto) {
    try {
      const meals = await this.mealEntity.findOne({
        where: {
          name: meal.name,
        },
      });
      if (meals) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '套餐已存在',
        };
      }
      const newMeal = new SetMeal();
      newMeal.name = meal.name;
      newMeal.code = meal.code;
      newMeal.category_id = meal.category_id;
      newMeal.description = meal.description;
      newMeal.image = meal.image;
      newMeal.price = meal.price;
      await this.mealEntity.save(newMeal);
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
  //删除套餐接口
  async deleteMeal(name: string) {
    try {
      const result = await this.mealEntity.findOne({
        where: {
          name: name,
        },
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误,套餐不存在',
        };
      }
      await this.mealEntity.delete({
        name: name,
      });
      return {
        code: HttpStatus.OK,
        message: '删除成功',
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
