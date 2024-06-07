import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SetMeal } from './entities/setmeal.entity';
import { CreateMealDto } from './dto/create-set-meal.dto';
import { BackMealVo } from './vo/backMeal.vo';
import { Category } from '../category/entities/category.entity';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class SetMealService {
  //注入set-meal entity
  @InjectRepository(SetMeal)
  private mealEntity: Repository<SetMeal>;
  //注入category entity
  @InjectRepository(Category)
  private categoryEntity: Repository<Category>;
  //注入employee entity
  @InjectRepository(Employee)
  private employeeEntity: Repository<Employee>;
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
      for (const item of result) {
        const category = await this.categoryEntity.findOne({
          where: {
            id: item.category_id,
          },
        });
        const user = await this.employeeEntity.findOne({
          where: {
            id: item.create_user,
          },
        });
        vo.name = item.name;
        vo.code = item.code;
        vo.price = item.price;
        vo.status = item.status;
        vo.description = item.description;
        vo.category = category.name;
        vo.image = item.image;
        vo.create = user.username;
        vo.update_time = item.update_time;
        list.push(vo);
      }
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
  //根据套餐号查询套餐
  async searchOne(id: number) {
    try {
      const meal = await this.mealEntity.findOne({
        where: {
          id: id,
        },
      });
      if (!meal) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '查询失败,套餐不存在',
        };
      }
      const vo = new BackMealVo();
      const category = await this.categoryEntity.findOne({
        where: {
          id: meal.category_id,
        },
      });
      const user = await this.employeeEntity.findOne({
        where: {
          id: meal.create_user,
        },
      });
      vo.name = meal.name;
      vo.code = meal.code;
      vo.price = meal.price;
      vo.status = meal.status;
      vo.description = meal.description;
      vo.category = category.name;
      vo.image = meal.image;
      vo.create = user.username;
      vo.update_time = meal.update_time;
      return {
        code: HttpStatus.OK,
        message: '查询成功',
        data: [vo],
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
