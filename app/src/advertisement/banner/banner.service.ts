import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banner } from './models/banner.schema';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<Banner>,
  ) {
  }

  getBanners() {
    return from(this.bannerModel.find()).pipe(
      map((banners) => banners && banners || null),
    );
  }
}