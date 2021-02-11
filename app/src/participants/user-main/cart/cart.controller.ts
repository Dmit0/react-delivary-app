import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guarg';
import { CurrentUser } from '../../../auth/utils/auth.utils';
import { CartService } from './cart.service';
import { ChangeItemInCartDto, DeleteMealFromCartDto, SetItemInCartDto } from './models/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('setItemInCart')
  setItemInCart(@CurrentUser() user: any, @Body() data: SetItemInCartDto) {
    return this.cartService.setItemInCart(user._id, data.mealId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('changeItemInCart')
  changeItemInCart(@CurrentUser() user: any, @Body() data: ChangeItemInCartDto) {
    return this.cartService.changeItemInCart(user._id, data.mealId, data.action)
  }

  @UseGuards(JwtAuthGuard)
  @Get('getCart')
  getCart(@CurrentUser() user: any) {
    return this.cartService.getCartUserItems(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('cleanCart')
  cleanCart(@CurrentUser() user: any) {
    return this.cartService.cleanCart(user._id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('deleteMealFromCart')
  deleteMealFromCart(@CurrentUser() user: any, @Body() data: DeleteMealFromCartDto) {
    return this.cartService.deleteMealFromCart(user._id, data.mealId)
  }

}
