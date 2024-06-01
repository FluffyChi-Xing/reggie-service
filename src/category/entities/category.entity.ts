import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '分类名',
    length: 64,
  })
  name: string;
  @Column({
    comment: '类型',
    nullable: true,
  })
  type: number;
  @Column({
    comment: '排序方式',
  })
  sort: number;
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
}
