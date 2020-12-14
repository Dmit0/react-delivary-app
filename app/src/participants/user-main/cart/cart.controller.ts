import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guarg';
import { CurrentUser } from '../../../auth/utils/auth.utils';
import { Action } from '../../../constants/enums/cart';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('setItemInCart')
  setItemInCart(@CurrentUser() user: any, @Body() mealId: string) {
    return this.cartService.setItemInCart(user._id, mealId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('setItemInCart')
  changeItemInCart(@CurrentUser() user: any, @Body() data: { action: Action, mealId }) {
    return this.cartService.changeItemInCart(user._id, data.mealId, data.action)
  }

  @UseGuards(JwtAuthGuard)
  @Post('setLoved')
  getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user._id)
  }

}
