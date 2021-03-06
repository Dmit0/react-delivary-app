import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BuyGuard } from '../../../auth/guards/buy.guard';
import { CurrentUser } from '../../../auth/utils/auth.utils';

@Controller('order')
export class OrderController {

  @UseGuards(BuyGuard)
  @Post('makeOrder')
  setItemInCart(@CurrentUser() user: any, @Body() data: any) {
    return { permission: true }
  }

  @UseGuards(BuyGuard)
  @Get('checkOrderPermission')
  checkOrderPermission() {
    return { permission: true }
  }
}
