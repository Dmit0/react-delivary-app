import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BuyGuard } from '../../../auth/guards/buy.guard';
import { CurrentUser } from '../../../auth/utils/auth.utils';

@Controller('order')
export class OrderController {

  @UseGuards(BuyGuard)
  @Post('makeOrder')
  setItemInCart(@CurrentUser() user: any, @Body() data: any) {
    console.log('success')
  }
}
