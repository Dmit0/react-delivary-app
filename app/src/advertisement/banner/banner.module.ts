import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { Banner, BannerSchema } from './models/banner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([// @ts-ignore
      { name: Banner.name, schema: BannerSchema },
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class MealModule {
}