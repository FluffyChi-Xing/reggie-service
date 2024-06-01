import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  //注入 dish entity
  @InjectRepository(Dish)
  private dishEntity: Repository<Dish>;
  //分页获取菜品接口
  async findAll(pageNo: number, pageSize: number) {
    try {
      if (!pageNo && pageNo < 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '页码不可为空或小于0',
        };
      }
      const skipCount = (pageNo - 1) * pageSize;
      const [result, totalCount] = await this.dishEntity.findAndCount({
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
  //新增菜品接口
  async createDish(dish: CreateDishDto) {
    try {
      const result = await this.dishEntity.findOne({
        where: {
          name: dish.name,
        },
      });
      if (result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '菜品已存在',
        };
      }
      const dishes = new Dish();
      dishes.name = dish.name;
      dishes.category_id = dish.category_id;
      dishes.code = dish.code;
      dishes.sort = dish.sort;
      dishes.image = dish.image;
      dishes.status = dish.status;
      dishes.description = dish.description;
      dishes.price = dish.price;
      await this.dishEntity.save(dishes);
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
  //删除菜品接口
  async deleteDish(name: string) {
    try {
      const result = await this.dishEntity.findOne({
        where: {
          name: name,
        },
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误，菜品不存在',
        };
      }
      await this.dishEntity.delete({
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
  //修改菜品接口
  async updateDish(dish: UpdateDishDto) {
    try {
      const result = await this.dishEntity.findOne({
        where: {
          name: dish.name,
        },
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误，要修改的菜品不存在',
        };
      }
      await this.dishEntity.update(
        {
          name: dish.name,
        },
        {
          sort: dish.sort,
          price: dish.price,
          image: dish.image,
          description: dish.description,
        },
      );
      return {
        code: HttpStatus.OK,
        message: '更新成功',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //菜品下架接口
  async dishFrozen(name: string) {
    try {
      const result = await this.dishEntity.findOne({
        where: {
          name: name,
        },
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误，菜品不存在',
        };
      }
      await this.dishEntity.update(
        {
          name: name,
        },
        {
          status: 0,
        },
      );
      return {
        code: HttpStatus.OK,
        message: '商品已下线',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //菜品上架接口
  async reuseDish(name: string) {
    try {
      const result = await this.dishEntity.findOne({
        where: {
          name: name,
        },
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误，菜品不存在',
        };
      }
      await this.dishEntity.update(
        {
          name: name,
        },
        {
          status: 1,
        },
      );
      return {
        code: HttpStatus.OK,
        message: '商品已上架',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //根据菜品名搜索菜品
  async searchDish(name: string) {
    try {
      const dish = await this.dishEntity.findOne({
        where: {
          name: name,
        },
      });
      if (!dish) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '菜品未找到',
        };
      }
      return {
        code: HttpStatus.OK,
        message: '查询成功',
        data: dish,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //定时统计菜品数量
  async getDishNumber() {
    try {
      const count = await this.dishEntity.count();
      return {
        code: HttpStatus.OK,
        message: '获取成功',
        data: count,
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
