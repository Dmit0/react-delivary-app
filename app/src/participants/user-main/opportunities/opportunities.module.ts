import { Module } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { OpportunitiesController } from './opportunities.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "../roles/models/Roles";
import { Opportunity, OpportunitySchema } from "./models/Opportunities";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Opportunity.name, schema: OpportunitySchema }
    ]),
  ],
  providers: [OpportunitiesService],
  controllers: [OpportunitiesController],
  exports:[OpportunitiesService]
})
export class OpportunitiesModule {}
