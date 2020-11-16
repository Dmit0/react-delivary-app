import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { exceptionErrors } from '../../../constants/errors/exeptionsErrors';
import { Opportunity } from '../opportunities/models/Opportunities';
import { Phone } from './models/phone.schema';

@Injectable()
export class PhoneService {
  constructor(
    @InjectModel(Phone.name) private phoneModel: Model<Phone>,
  ) {
  }

  createPhone(property: { phoneNumber: string, code: string }): Observable<any> {
    console.log(property)
    return from(this.phoneModel.findOne({ phoneNumber: property.phoneNumber })).pipe(
      mergeMap((response) => {
        console.log(response)
        if (response) {
          return of(null);
        } else {
          const newPhone = new this.phoneModel({ ...property });
          return from(newPhone.save()).pipe(
            catchError((err) => {
              throw exceptionErrors.throwForbiddenError;
            }),
            map((role) => role || null),
          );
        }
      }),
    );
  }

  sendVerifyMessage(){
    return
  }
}
