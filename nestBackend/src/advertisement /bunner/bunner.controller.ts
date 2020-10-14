import { Controller, Get } from '@nestjs/common';
import { BunnerService } from './bunner.service';

@Controller('restaurants')
export class BunnerController {

  constructor(private bunnerService: BunnerService) {
  }

  @Get()
  //type for returning getMeal
  //type fot input
  getBunner(): any {
    return this.bunnerService.getBunners();
  }
}