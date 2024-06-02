import { Module } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorController } from './flavor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish_Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish_Flavor])],
  controllers: [FlavorController],
  providers: [FlavorService],
})
export class FlavorModule {}
