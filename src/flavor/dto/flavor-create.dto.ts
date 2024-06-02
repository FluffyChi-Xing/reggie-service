import { IsNotEmpty } from 'class-validator';

export class FlavorCreateDto {
  @IsNotEmpty({
    message: '口味名',
  })
  name: string;
  value: string;
}
