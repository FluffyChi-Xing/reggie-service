import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    comment: '用户名',
    unique: true,
    length: 50,
  })
  name: string;
  @Column({
    comment: '电话号',
    length: 100,
  })
  phone: string;
  @Column({
    comment: '性别',
    length: 2,
    nullable: true,
  })
  sex: string;
  @Column({
    comment: '身份证号',
    length: 18,
    nullable: true,
  })
  id_number: string;
  @Column({
    comment: '账户状态',
    default: 1,
  })
  status: number;
  @Column({
    comment: '头像',
    length: 500,
    nullable: true,
  })
  avatar: string;
}
