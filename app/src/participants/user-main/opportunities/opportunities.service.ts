import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Opportunity } from './models/Opportunities';

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectModel(Opportunity.name) private opportunityModel: Model<Opportunity>,
  ) {
  }
  createOpportunity(property): Observable<any> {
    return from(this.opportunityModel.find()).pipe(
      mergeMap((response) => {
        if (response.length > 0) {
          return of(null);
        } else {
          const newOpportunity = new this.opportunityModel({ ...property });
          return from(newOpportunity.save()).pipe(
            map((opportunity) => opportunity),
          );
        }
      }),
    );
  }

  findOpportunities(property: string[]): Observable<any> {
   return forkJoin(property.map((item)=>{
     return this.findOpportunity({name:item}).pipe(
       map((opportunity) => opportunity || null)
     )
   }))
  }

  findOpportunity(property: any): Observable<any> {
    return from(this.opportunityModel.findOne(property)).pipe(
      map((opportunity) => opportunity || null)
    )
  }

}
