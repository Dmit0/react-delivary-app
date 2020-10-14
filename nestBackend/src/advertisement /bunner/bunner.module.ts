import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BunnerController } from './bunner.controller';
import { BunnerService } from './bunner.service';
import { Bunner, BunnerSchema } from './models/bunner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bunner.name, schema: BunnerSchema },
    ]),
  ],
  controllers: [BunnerController],
  providers: [BunnerService],
})
export class MealModule {
}