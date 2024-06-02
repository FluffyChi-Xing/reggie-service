import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { LoginGuard } from '../common/guard/login-guard.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //用户短信登录
  //用户注册
  @Post('register')
  async userRegister(@Body() user: UserCreateDto) {
    return await this.userService.userRegister(user);
  }
  //管理员拉去用户数据（预留接口）
  @Get('pull')
  @UseGuards(LoginGuard)
  async pullAllUser(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.userService.pullUser(pageNo, pageSize);
  }
}
