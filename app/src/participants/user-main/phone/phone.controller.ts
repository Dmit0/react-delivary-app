import { Controller, Post } from '@nestjs/common';

@Controller('phone')
export class PhoneController {
  @Post('prefix/generate')
  generatePhonePrefix(){
    return
  }
}
