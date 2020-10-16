import { Controller, Get } from '@nestjs/common';
import { BunnerService } from './bunner.service';

@Controller('banners')
export class BunnerController {

  constructor(private bunnerService: BunnerService) {
  }

  @Get()
  //type for returning getMeal
  //type fot input
  getBanners(): any {
    return this.bunnerService.getBunners();
  }
}