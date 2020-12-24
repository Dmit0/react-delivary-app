import { Controller, Get, Post } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {
  }
  @Post('generate')
  generate(){
    console.log('generate countries')
    return this.countryService.generateCountry()
  }

  @Get('get')
  getCountries(){
    return this.countryService.get()
  }
}
