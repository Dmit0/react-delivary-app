import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/models/user.schema';
import { Opportunity, OpportunitySchema } from './models/Opportunities';
import { Role, RoleSchema } from './models/Roles';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Opportunity.name, schema: OpportunitySchema }
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
