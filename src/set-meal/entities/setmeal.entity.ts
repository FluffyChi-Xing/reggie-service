import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SetMeal {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '套餐名',
    length: 64,
    unique: true,
  })
  name: string;
  @Column({
    comment: '菜品分类编号',
  })
  category_id: number;
  @Column({
    comment: '价格',
  })
  price: number;
  @Column({
    nullable: true,
  })
  status: number;
  @Column({
    comment: '代码',
    nullable: true,
    length: 32,
  })
  code: string;
  @Column({
    comment: '套餐描述',
    nullable: true,
    length: 512,
  })
  description: string;
  @Column({
    comment: '套餐图片',
    nullable: true,
    length: 255,
  })
  image: string;
  @CreateDateColumn()
  create_time: Date;
  @UpdateDateColumn()
  update_time: Date;
  @Column({
    default: 0,
  })
  create_user: number;
  @Column({
    default: 0,
  })
  update_user: number;
  @Column({
    default: 0,
  })
  is_deleted: number;
}
