import { Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CuisineService } from './cuisen.service';
import { ICuisine } from './models/cuisine.types';

@Controller('cuisine')
export class CuisineController {

  constructor(private cuisineService: CuisineService) {
  }

  @Get('getCuisines')
  getCuisines(): Observable<ICuisine[]> {
    return this.cuisineService.getCuisines();
  }

  @Post('generate')
  generateCuisines(){
    console.log('generate cuisines')
    return this.cuisineService.generateCuisines()
  }
}