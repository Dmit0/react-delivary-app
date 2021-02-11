import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Opportunity } from './models/Opportunities';

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectModel(Opportunity.name) private opportunityModel: Model<Opportunity>,
  ) {
  }
  createOpportunities(property: any[]): Observable<any> {
    return from(this.opportunityModel.find()).pipe(
      mergeMap((response) => {
        if (response.length > 0) {
          return of(null);
        } else return this.createManyOpportunities(property)
      }),
    );
  }

  private createManyOpportunities(opportunities: any[]): Observable<any> {
    return from(opportunities).pipe(
      mergeMap((opportunity) => {
        const newOpportunity = new this.opportunityModel({ ...opportunity });
        return from(newOpportunity.save()).pipe(
          map((opportunity) => opportunity),
        );
      }),
    );
  }

  findOpportunities(property: string[]): Observable<Opportunity[]> {
    return from(this.opportunityModel.find().where('name').in(property)).pipe(
      map(opportunities => opportunities || null)
    )
  }

  findOpportunity(property: any): Observable<any> {
    return from(this.opportunityModel.findOne(property)).pipe(
      map((opportunity) => opportunity || null)
    )
  }

}
