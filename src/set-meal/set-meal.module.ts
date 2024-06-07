import { Module } from '@nestjs/common';
import { SetMealService } from './set-meal.service';
import { SetMealController } from './set-meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetMeal } from './entities/setmeal.entity';
import { Category } from '../category/entities/category.entity';
import { Employee } from '../employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SetMeal, Category, Employee])],
  controllers: [SetMealController],
  providers: [SetMealService],
})
export class SetMealModule {}
