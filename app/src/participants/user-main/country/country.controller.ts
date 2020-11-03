import { Controller, Post } from '@nestjs/common';

@Controller('country')
export class CountryController {
  @Post('generate')
  countryGenerate(){
    return
  }
}
