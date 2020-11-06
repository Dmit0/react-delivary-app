import { Controller, Post } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {
  }
  @Post('generate')
  generate(){
    console.log('generate counties')
    return this.countryService.generateCountry()
  }
}
