import { DishesDto } from './dishes-category.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDto extends DishesDto {
  @IsNotEmpty({
    message: 'id不可为空',
  })
  id: number;
}
