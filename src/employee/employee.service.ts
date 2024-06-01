import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/employee-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { md5 } from '../utils/md5';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/employee-register.dto';
import { BackVo } from './vo/employee-back.vo';
import { UpdateDto } from './dto/employee-update.dto';

@Injectable()
export class EmployeeService {
  //注入employee entity
  @InjectRepository(Employee)
  private employeeEntity: Repository<Employee>;
  //注入config service
  @Inject(ConfigService)
  private configService: ConfigService;
  //注入JWT service
  @Inject(JwtService)
  private jwtService: JwtService;
  //测试接口
  test() {
    return {
      code: HttpStatus.OK,
      message: `This action returns all employee`,
      data: {},
    };
  }
  //初始插入表数据
  async insertOne() {
    try {
      const user = new Employee();
      user.username = 'admin';
      user.password = md5('123456');
      user.sex = '1';
      user.phone = '13144453456';
      user.status = 1;
      user.id_number = '546342344354654465';
      const result = await this.employeeEntity.insert(user);
      return {
        code: HttpStatus.OK,
        message: '插入成功',
        data: result,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //用户登录接口
  async userLogin(user: LoginDto) {
    try {
      const person = await this.employeeEntity.findOne({
        where: {
          username: user.username,
        },
      });
      if (person.password !== md5(user.password)) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '密码错误',
        };
      }
      if (person.status === 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '用户已被封禁',
        };
      }
      //生成access token
      const access = this.jwtService.sign(
        {
          username: user.username,
          password: user.password,
        },
        {
          expiresIn: this.configService.get('jwt_server_access'),
        },
      );
      const refresh = this.jwtService.sign(
        {
          username: user.username,
        },
        {
          expiresIn: this.configService.get('jwt_server_refresh'),
        },
      );
      return {
        code: HttpStatus.OK,
        message: '登陆成功',
        data: {
          accessToken: access,
          refreshToken: refresh,
        },
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //token 刷新接口
  async refreshToken(str: string) {
    try {
      const data = await this.jwtService.verify(str);
      const user = await this.employeeEntity.findOne({
        where: {
          username: data.username,
        },
      });
      if (!user) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '用户不存在',
        };
      }
      const access = this.jwtService.sign(
        {
          username: user.username,
          password: user.password,
        },
        {
          expiresIn: this.configService.get('jwt_server_access'),
        },
      );
      const refresh = this.jwtService.sign(
        {
          username: user.username,
        },
        {
          expiresIn: this.configService.get('jwt_server_refresh'),
        },
      );
      return {
        code: HttpStatus.OK,
        message: '刷新成功',
        data: {
          access: access,
          refresh: refresh,
        },
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: 'refresh token 已过期,请重新登录',
        data: e,
      };
    }
  }
  //添加员工接口
  async add(employee: RegisterDto) {
    try {
      const user = await this.employeeEntity.findOne({
        where: {
          username: employee.username,
        },
      });
      if (user) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '用户已注册，请登录',
        };
      }
      const newEmployee = new Employee();
      newEmployee.username = employee.username;
      newEmployee.password = md5(employee.password);
      newEmployee.sex = employee.sex;
      newEmployee.phone = employee.phone;
      newEmployee.status = employee.status;
      newEmployee.id_number = employee.id_number;
      await this.employeeEntity.save(newEmployee);
      return {
        code: HttpStatus.OK,
        message: '添加成功',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //分页查询员工数据
  async searchByPages(pageNo: number, pageSize: number) {
    try {
      if (!pageNo || pageNo < 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '页码不能为空或小于0',
        };
      }
      const skipCount = (pageNo - 1) * pageSize;
      const [result, totalCount] = await this.employeeEntity.findAndCount({
        skip: skipCount,
        take: pageSize,
      });
      const list = [];
      const vo = new BackVo(); //使用vo规范返回数据的格式
      await result.forEach((item) => {
        vo.username = item.username;
        vo.password = item.password;
        vo.sex = item.sex;
        vo.phone = item.phone;
        vo.id_number = item.id_number;
        vo.status = item.status;
        list.push(vo);
      });
      return {
        code: HttpStatus.OK,
        message: '拉取成功',
        data: {
          result: list,
          count: totalCount,
        },
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '拉取错误',
        data: e,
      };
    }
  }
  //禁用员工账号接口
  async frozenEmployee(user: string) {
    try {
      const result = await this.employeeEntity.findOne({
        where: {
          username: user,
        },
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '用户不存在，错误',
        };
      }
      const person = await this.employeeEntity.update(
        {
          username: user,
        },
        {
          status: 0,
        },
      );
      return {
        code: HttpStatus.OK,
        message: `用户: ${user} 账户已冻结`,
        data: person,
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //解禁用户账户接口
  async reuse(user: string) {
    try {
      const result = await this.employeeEntity.findOne({
        where: {
          username: user,
        },
      });
      if (!result) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '未找到用户，错误',
        };
      }
      if (result.status !== 0) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '用户账户未被封禁，无需解冻',
        };
      }
      await this.employeeEntity.update(
        {
          username: user,
        },
        {
          status: 1,
        },
      );
      return {
        code: HttpStatus.OK,
        message: '成功解禁',
      };
    } catch (e) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '错误',
        data: e,
      };
    }
  }
  //更新用户接口
  async updateUser(user: UpdateDto) {
    try {
      const person = await this.employeeEntity.findOne({
        where: {
          username: user.username,
        },
      });
      if (!person) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '用户不存在',
        };
      }
      await this.employeeEntity.update(
        {
          username: user.username,
        },
        {
          name: user.name,
          password: user.password,
          phone: user.phone,
          sex: user.sex,
          id_number: user.id_number,
        },
      );
      return {
        code: HttpStatus.OK,
        message: '更新成功',
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
  //查询职工接口
  async searchOne(name: string) {
    try {
      const employee = await this.employeeEntity.findOne({
        where: {
          name: name,
        },
      });
      if (!employee) {
        return {
          code: HttpStatus.BAD_REQUEST,
          message: '不存在该用户',
        };
      }
      return {
        code: HttpStatus.OK,
        message: '查询成功',
        data: employee,
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
