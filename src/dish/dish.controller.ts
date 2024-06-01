import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DishService } from './dish.service';
import { LoginGuard } from '../common/guard/login-guard.guard';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}
  //分页获取菜品数据
  @Get('pull')
  async findAll(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.dishService.findAll(pageNo, pageSize);
  }
  //添加菜品接口
  @Post('create')
  @UseGuards(LoginGuard)
  async createDish(@Body() dishes: CreateDishDto) {
    return await this.dishService.createDish(dishes);
  }
  //菜品删除接口
  @Get('delete')
  @UseGuards(LoginGuard)
  async deleteDish(@Query('name') name: string) {
    return await this.dishService.deleteDish(name);
  }
  //更新菜品接口
  @Post('update')
  @UseGuards(LoginGuard)
  async updateDish(@Body() dish: UpdateDishDto) {
    return await this.dishService.updateDish(dish);
  }
  //菜品下架接口
  @Get('frozen')
  @UseGuards(LoginGuard)
  async dishFrozen(@Query('name') name: string) {
    return await this.dishService.dishFrozen(name);
  }
  //菜品上架接口
  @Get('reuse')
  @UseGuards(LoginGuard)
  async reuseDish(@Query('name') name: string) {
    return await this.dishService.reuseDish(name);
  }
  //按菜品名搜索菜品
  @Get('search')
  @UseGuards(LoginGuard)
  async searchOne(@Query('name') name: string) {
    return await this.dishService.searchDish(name);
  }
  //统计所有菜品数量的接口
  @Get('number')
  @UseGuards(LoginGuard)
  async howMany() {
    return await this.dishService.getDishNumber();
  }
}
