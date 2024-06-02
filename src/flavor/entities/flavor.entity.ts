import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Dish_Flavor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '菜品id',
    default: 0,
  })
  dish_id: number;
  @Column({
    comment: '程度',
    length: 64,
  })
  name: string;
  @Column({
    comment: '风味',
    length: 500,
    nullable: true,
  })
  value: string;
  @CreateDateColumn()
  create_time: Date;
  @UpdateDateColumn()
  update_time: Date;
  @Column({
    default: 0,
  })
  update_user: number;
  @Column({
    default: 0,
  })
  is_delete: number;
}
