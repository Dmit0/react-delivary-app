import { Controller, Get } from '@nestjs/common';
import { BannerService } from './banner.service';

@Controller('restaurants')
export class BannerController {

  constructor(private bannerService: BannerService) {
  }

  @Get('getBanners')
  //type for returning getMeal
  //type fot input
  getBunner(): any {
    return this.bannerService.getBanners();
  }
}