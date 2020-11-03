import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../roles/models/Roles';
import { Opportunity } from './models/Opportunities';

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectModel(Opportunity.name) private opportunityModel: Model<Opportunity>,
  ) {
  }
  createOpportunity(property){
    const newOpportunity = new this.opportunityModel({ ...property } );
    return from(newOpportunity.save()).pipe(
      map((opportunity) => opportunity ),
    );
  }

   findOpportunities(property:string[]):Observable<any>{
    return from(property.map((property) => this.opportunityModel.findOne({ name: property })))
  }

}
