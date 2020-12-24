import { Controller, Get } from '@nestjs/common';
import { BannerService } from './banner.service';

@Controller('banners')
export class BannerController {

  constructor(private bannerService: BannerService) {
  }

  @Get('getBanners')
  getBanner(): any {
    return this.bannerService.getBanners();
  }
}