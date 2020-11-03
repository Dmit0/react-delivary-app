import { Controller, Post } from '@nestjs/common';

@Controller('phone')
export class PhoneController {
  @Post('create')//this made in service dont nee controller
  createPhone(){
    return
  }
}
