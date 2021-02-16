import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BannerService } from './banner.service';
import { IBanner } from './models/banner.types';

@Controller('banners')
export class BannerController {

  constructor(private bannerService: BannerService) {
  }

  @Get('getBanners')
  getBanner(): Observable<IBanner[]> {
    return this.bannerService.getBanners();
  }
}