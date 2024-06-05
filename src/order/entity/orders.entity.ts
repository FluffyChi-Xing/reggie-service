import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: true,
    default: 1,
  })
  status: number;
  @Column({
    nullable: true,
  })
  number: number;
  @Column()
  user_id: number;
  @Column()
  address_book_id: number;
  @Column()
  order_time: Date;
  @CreateDateColumn()
  checkout_time: Date;
  @Column()
  pay_method: number;
  @Column()
  amount: number;
  @Column({
    length: 100,
    nullable: true,
  })
  remark: string;
  @Column({
    length: 255,
    nullable: true,
  })
  phone: string;
  @Column({
    length: 255,
    nullable: true,
  })
  address: string;
  @Column({
    length: 255,
    nullable: true,
  })
  username: string;
  @Column({
    length: 255,
    nullable: true,
  })
  consignee: string;
}
