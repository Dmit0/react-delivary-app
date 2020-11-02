import { Controller, Get, Post } from '@nestjs/common';
import { CuisineService } from './cuisen.service';

@Controller('cuisine')
export class CuisineController {

  constructor(private cuisineService: CuisineService) {
  }

  @Get('getCuisines')
  getCuisines(): any {
    return this.cuisineService.getCuisines();
  }

  @Post('generate')
  generateCuisines(){
    return
  }
}