import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ShoppingCartService } from './shopping_cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}
  //添加购物车
  @Post('add')
  async addCart(@Body() cart: CreateCartDto) {
    return await this.shoppingCartService.addCart(cart);
  }
  //查询购物车
  @Get('search')
  async searchCart(@Query('id') id: number) {
    return await this.shoppingCartService.searchCart(id);
  }
}
