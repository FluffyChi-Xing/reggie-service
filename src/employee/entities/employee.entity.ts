import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '权限名',
    length: 32,
    nullable: true,
  })
  name: string;
  @Column({
    comment: '用户名',
    length: 32,
    unique: true,
  })
  username: string;
  @Column({
    comment: '密码',
    length: 64,
  })
  password: string;
  @Column({
    comment: '手机号',
    length: 11,
  })
  phone: string;
  @Column({
    comment: '性别',
    length: 2,
  })
  sex: string;
  @Column({
    comment: 'id号',
    length: 18,
  })
  id_number: string;
  @Column({
    comment: '权限名',
  })
  status: number;
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
