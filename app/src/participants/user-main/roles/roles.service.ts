import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { opportunity as  opportunities} from '../../../constants/initializeData/opportunities.base';
import { OpportunitiesService } from '../opportunities/opportunities.service';
import { Role } from './models/Roles';
import { roles } from '../../../constants/initializeData/roles.base'

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private readonly opportunitiesService: OpportunitiesService,
  ) {
  }

 async generateRoles() {
    await opportunities.forEach((opportunity) => this.opportunitiesService.createOpportunity({ name: opportunity.name }))
    await roles.forEach((role) => this.opportunitiesService.findOpportunities(role.opportunities).pipe(
      mergeMap((opportunities:[]) => this.createRole({ ...role, opportunities:opportunities.map((opportunity: any) => opportunity._id) }))
    ))
  }

  private createRole(property): Observable<Role> {
    const newRole = new this.roleModel({ ...property } );
    return from(newRole.save()).pipe(
      map((role) => role ),
    );
  }

   findRole(property): Observable<Role> {
    return from(this.roleModel.findOne(property)).pipe(
      map((role) => role || null)
    )
  }
}
