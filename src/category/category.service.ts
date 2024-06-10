import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { DishesDto } from './dto/dishes-category.dto';
import { UpdateDto } from './dto/update-category.dto';
import { CategoryVo } from './vo/category.vo';

@Injectable()
export class CategoryService {
  //注入 category entity
  @InjectRepository(Category)
  private categoryEntity: Repository<Category>;
  //分页查询分类
  async findAll(pageNo: number, pageSize: number) {
    try {
      if (pageNo < 0 || !pageNo) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '页码不可小于0或为空',
        };
      }
      const skipCount = (pageNo - 1) * pageSize;
      const [result, totalCount] = await this.categoryEntity.findAndCount({
        skip: skipCount,
        take: pageSize,
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '数据库为空',
        };
      }
      return {
        code: HttpStatus.OK,
        message: '拉取成功',
        data: result,
        totalCount: totalCount,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //新增菜品分类接口
  async createDish(dish: DishesDto) {
    try {
      const dishes = new Category();
      dishes.sort = dish.sort;
      dishes.type = dish.type;
      dishes.name = dish.name;
      await this.categoryEntity.save(dishes);
      return {
        code: HttpStatus.OK,
        message: '新增成功',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '新增失败',
        data: e,
      };
    }
  }
  //新增套餐分类接口
  async createPack(pack: DishesDto) {
    try {
      const packages = new Category();
      packages.name = pack.name;
      packages.type = pack.type;
      packages.sort = pack.sort;
      await this.categoryEntity.save(packages);
      return {
        code: HttpStatus.OK,
        message: '新增成功',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '新增失败',
        data: e,
      };
    }
  }
  //根据id删除分类
  async deleteCat(id: number) {
    try {
      const category = await this.categoryEntity.findOne({
        where: {
          id: id,
        },
      });
      if (!category) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '要删除的表不存在',
        };
      }
      await this.categoryEntity.delete({
        id: id,
      });
      return {
        code: HttpStatus.OK,
        message: '删除成功',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '删除失败',
        data: e,
      };
    }
  }
  //根据id修改分类
  async updateCat(up: UpdateDto) {
    try {
      const category = await this.categoryEntity.findOne({
        where: {
          id: up.id,
        },
      });
      if (!category) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '要修改的分类不存在',
        };
      }
      await this.categoryEntity.update(
        {
          id: up.id,
        },
        {
          name: up.name,
          type: up.type,
          sort: up.sort,
        },
      );
      return {
        code: HttpStatus.OK,
        message: '修改成功',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '修改失败',
        data: e,
      };
    }
  }
  //拉取全部分类
  async pullAll() {
    try {
      const category = await this.categoryEntity.find();
      const result = [];
      category.forEach((item) => {
        const vo = new CategoryVo();
        vo.id = item.id;
        vo.name = item.name;
        result.push(vo);
      });
      return {
        code: HttpStatus.OK,
        message: 'success',
        data: result,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //根据id查询分类
  async searchId(id: number) {
    try {
      const category = await this.categoryEntity.findOne({
        where: {
          id: id,
        },
      });
      if (!category) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误,不存在分类',
        };
      }
      return {
        code: HttpStatus.OK,
        message: '查询成功',
        data: [category],
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
