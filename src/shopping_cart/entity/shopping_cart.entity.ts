import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shopping_cart {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
    nullable: true,
  })
  name: string;
  @Column({
    length: 100,
    nullable: true,
  })
  image: string;
  @Column()
  user_id: number;
  @Column({
    nullable: true,
  })
  dish_id: number;
  @Column({
    nullable: true,
  })
  setmeal_id: number;
  @Column({
    length: 50,
    nullable: true,
  })
  dish_flavor: string;
  @Column({
    default: 0,
  })
  amount: number;
  @CreateDateColumn()
  create_time: Date;
}
