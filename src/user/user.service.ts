import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  //注入user entity
  @InjectRepository(User)
  private userEntity: Repository<User>;
  //用户注册服务
  async userRegister(user: UserCreateDto) {
    try {
      //检查是否登录
      const users = await this.userEntity.findOne({
        where: {
          name: user.username,
        },
      });
      if (users) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '用户已注册，请登录',
        };
      }
      const newUser = new User();
      newUser.name = user.username;
      newUser.id_number = user.id_number;
      newUser.phone = user.phone;
      newUser.avatar = user.avatar;
      await this.userEntity.save(newUser);
      return {
        code: HttpStatus.OK,
        message: '注册成功',
        data: {},
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //管理员查询所有用户
  async pullUser(pageNo: number, pageSize: number) {
    try {
      if (pageNo <= 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '错误，页码不可为空',
        };
      }
      const skipCount = (pageNo - 1) * pageSize;
      const [users, totalCount] = await this.userEntity.findAndCount({
        skip: skipCount,
        take: pageSize,
      });
      return {
        code: HttpStatus.OK,
        message: '拉取成功',
        data: users,
        count: totalCount,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
}
