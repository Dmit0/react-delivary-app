import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpportunitiesModule } from '../opportunities/opportunities.module';
import { User, UserSchema } from '../user/models/user.schema';
import { Opportunity, OpportunitySchema } from '../opportunities/models/Opportunities';
import { Role, RoleSchema } from './models/Roles';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
    ]),
    OpportunitiesModule,
  ],
  exports:[RolesService],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
