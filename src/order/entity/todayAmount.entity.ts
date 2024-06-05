import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Amount {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  employee_id: number;
  @Column({
    default: 0,
    nullable: true,
  })
  amount: number;
  @Column({
    default: 0,
    nullable: true,
  })
  finish_order_number: number;
  @Column({
    default: 0,
    nullable: true,
  })
  cancel_order_number: number;
  @CreateDateColumn()
  create_time: Date;
  @UpdateDateColumn()
  update_time: Date;
}
