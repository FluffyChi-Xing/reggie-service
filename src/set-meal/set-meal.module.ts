import { Module } from '@nestjs/common';
import { SetMealService } from './set-meal.service';
import { SetMealController } from './set-meal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetMeal } from './entities/setmeal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SetMeal])],
  controllers: [SetMealController],
  providers: [SetMealService],
})
export class SetMealModule {}
