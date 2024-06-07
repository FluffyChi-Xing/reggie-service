import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SetMealService } from './set-meal.service';
import { LoginGuard } from '../common/guard/login-guard.guard';
import { CreateMealDto } from './dto/create-set-meal.dto';

@Controller('set-meal')
export class SetMealController {
  constructor(private readonly setMealService: SetMealService) {}
  @Get('pull')
  @UseGuards(LoginGuard)
  async findAll(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.setMealService.findAll(pageNo, pageSize);
  }
  //新增套餐接口
  @Post('create')
  @UseGuards(LoginGuard)
  async createMeal(@Body() meal: CreateMealDto) {
    return await this.setMealService.createMeal(meal);
  }
  //删除套餐
  @Get('delete')
  @UseGuards(LoginGuard)
  async deleteMeal(@Query('name') name: string) {
    return await this.setMealService.deleteMeal(name);
  }
  //查询套餐接口
  @Get('search')
  @UseGuards(LoginGuard)
  async searchOne(@Query('id') id: number) {
    return await this.setMealService.searchOne(id);
  }
}
