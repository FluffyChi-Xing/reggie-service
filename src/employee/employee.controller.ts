import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { LoginDto } from './dto/employee-login.dto';
import { RegisterDto } from './dto/employee-register.dto';
import { LoginGuard } from '../common/guard/login-guard.guard';
import { UpdateDto } from './dto/employee-update.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  //员工测试接口
  @Get('test')
  test() {
    return this.employeeService.test();
  }
  //初始插入表数据
  @Get('init')
  async initData() {
    return await this.employeeService.insertOne();
  }
  //员工登录接口
  @Post('login')
  async userLogin(@Body() user: LoginDto) {
    return await this.employeeService.userLogin(user);
  }
  //token刷新接口
  @Get('refresh')
  async refreshToken(@Query('refresh') refresh: string) {
    return await this.employeeService.refreshToken(refresh);
  }
  //添加员工接口
  @Post('add')
  @UseGuards(LoginGuard)
  async addEmployee(@Body() employee: RegisterDto) {
    return await this.employeeService.add(employee);
  }
  //分页查询员工数据
  @Get('pull')
  @UseGuards(LoginGuard)
  async pullInfo(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.employeeService.searchByPages(pageNo, pageSize);
  }
  //用户冻结接口
  @Get('frozen')
  @UseGuards(LoginGuard)
  async frozenUser(@Query('user') user: string) {
    return await this.employeeService.frozenEmployee(user);
  }
  //用户账户解冻接口
  @Get('reuse')
  @UseGuards(LoginGuard)
  async reuseUser(@Query('user') user: string) {
    return await this.employeeService.reuse(user);
  }
  //更新用户接口
  @Post('update')
  @UseGuards(LoginGuard)
  async updateUser(@Body() user: UpdateDto) {
    return await this.employeeService.updateUser(user);
  }
  //根据用户名查询用户
  @Get('search')
  @UseGuards(LoginGuard)
  async searchOne(@Query('name') name: string) {
    return await this.employeeService.searchOne(name);
  }
}
