import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { tap } from 'rxjs/operators';
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
  setItemInCart(@CurrentUser() user: any, @Body() data: { mealId: string }) {
    return this.cartService.setItemInCart(user._id, data.mealId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('changeItemInCart')
  changeItemInCart(@CurrentUser() user: any, @Body() data: { action: Action, mealId }) {
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
  deleteMealFromCart(@CurrentUser() user: any, @Body() data: { mealId: string }) {
    return this.cartService.deleteMealFromCart(user._id, data.mealId)
  }

}
