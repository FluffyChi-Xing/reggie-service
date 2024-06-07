import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish_Flavor } from './entities/flavor.entity';
import { Repository } from 'typeorm';
import { FlavorCreateDto } from './dto/flavor-create.dto';
import { FlavorBackVo } from './vo/flavor-back.vo';

@Injectable()
export class FlavorService {
  //注入菜品风味 entity
  @InjectRepository(Dish_Flavor)
  private dishFlavor: Repository<Dish_Flavor>;
  async findAll(pageSize: number, pageNo: number) {
    try {
      if (pageNo <= 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '页码必须大于0',
        };
      }
      const skipCount = (pageNo - 1) * pageSize;
      const [flavor, totalCount] = await this.dishFlavor.findAndCount({
        skip: skipCount,
        take: pageSize,
      });
      return {
        code: HttpStatus.OK,
        message: '拉取成功',
        data: flavor,
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
  //新增口味
  async createFlavor(flavor: FlavorCreateDto) {
    try {
      const newFlavor = new Dish_Flavor();
      newFlavor.name = flavor.name;
      newFlavor.value = flavor.value;
      await this.dishFlavor.save(newFlavor);
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
  //拉取不重复的菜品风味
  async distinctFlavor() {
    try {
      const flavor = await this.dishFlavor.find();
      const uniqueFlavor = Array.from(
        new Set(flavor.map((item) => item.name)),
      ).map((name) => {
        return flavor.find((item) => item.name === name);
      });
      const result = [];
      const vo = new FlavorBackVo();
      uniqueFlavor.forEach((item) => {
        vo.id = item.id;
        vo.name = item.name;
        vo.value = item.value;
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
}
