import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { LoginGuard } from '../common/guard/login-guard.guard';
import { FlavorCreateDto } from './dto/flavor-create.dto';

@Controller('flavor')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}
  @Get('pull')
  @UseGuards(LoginGuard)
  async findAll(
    @Query('pageNo') pageNo: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.flavorService.findAll(pageSize, pageNo);
  }
  //添加口味
  @Post('create')
  @UseGuards(LoginGuard)
  async createFlavor(@Body() flavor: FlavorCreateDto) {
    return await this.flavorService.createFlavor(flavor);
  }
}
