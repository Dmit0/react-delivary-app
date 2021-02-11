import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable, of } from 'rxjs';
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

  generateRoles() {
    return this.opportunitiesService.createOpportunities(opportunities).pipe(
      mergeMap(() => from(roles).pipe(
        mergeMap(role => this.opportunitiesService.findOpportunities([ ...role.opportunities ]).pipe(
          mergeMap((roleOpportunities) => this.createRole({
            name: role.name,
            opportunities: roleOpportunities.map((o) => o._id),
          })),
          ),
        )),
      ));
  }

 private createRole(property): Observable<any> {
    return from(this.roleModel.find()).pipe(
      mergeMap((response) => {
        if (response.length > 0) {
          return of(null);
        } else {
          const newRole = new this.roleModel({ name:property.name, opportunities:[...property.opportunities]});
          return from(newRole.save()).pipe(
            map((role) => role),
          );
        }
      }),
    );
  }

   findRole(property): Observable<Role> {
    return from(this.roleModel.findOne(property)).pipe(
      map((role) => role || null)
    )
  }
}
