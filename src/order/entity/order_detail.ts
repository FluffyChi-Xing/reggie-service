import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order_detail {
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
  order_id: number;
  @Column({
    nullable: true,
  })
  dish_id: number;
  @Column({
    nullable: true,
  })
  setmeal_id: number;
  @Column({
    nullable: true,
  })
  dish_flavor: string;
  @Column({
    default: 1,
  })
  number: number;
  @Column()
  amount: number;
}
