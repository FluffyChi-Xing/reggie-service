import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { LoginGuard } from '../common/guard/login-guard.guard';
import { DishesDto } from './dto/dishes-category.dto';
import { UpdateDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  //分页查询分类
  @Get('pull')
  @UseGuards(LoginGuard)
  async findAll(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.categoryService.findAll(pageNo, pageSize);
  }
  //新增菜品分类
  @Post('dishes')
  @UseGuards(LoginGuard)
  async createDishes(@Body() dish: DishesDto) {
    return await this.categoryService.createDish(dish);
  }
  //新增套餐分类
  @Post('package')
  @UseGuards(LoginGuard)
  async createPackage(@Body() pack: DishesDto) {
    return await this.categoryService.createPack(pack);
  }
  //根据分类id删除分类
  @Get('delete')
  @UseGuards(LoginGuard)
  async deleteCat(@Query('id') id: number) {
    return await this.categoryService.deleteCat(id);
  }
  //根据分类id修改分类
  @Post('update')
  @UseGuards(LoginGuard)
  async updateCat(@Body() up: UpdateDto) {
    return await this.categoryService.updateCat(up);
  }
  //查询所有分类
  @Get('findAll')
  @UseGuards(LoginGuard)
  async pullAll() {
    return await this.categoryService.pullAll();
  }
}
