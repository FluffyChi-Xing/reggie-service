import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 64,
    comment: '品名',
    unique: true,
  })
  name: string;
  @Column({
    comment: '分类编号',
  })
  category_id: number;
  @Column({
    comment: '菜品价格',
    nullable: true,
  })
  price: number;
  @Column({
    length: 64,
    comment: '菜品代号',
  })
  code: string;
  @Column({
    length: 200,
    comment: '菜品图片',
  })
  image: string;
  @Column({
    nullable: true,
    comment: '菜品描述',
    length: 400,
  })
  description: string;
  @Column({
    comment: '菜品状态',
  })
  status: number;
  @Column({
    comment: '菜品排序',
  })
  sort: number;
  @CreateDateColumn()
  create_time: Date;
  @UpdateDateColumn()
  update_time: Date;
}
