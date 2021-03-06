import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { exceptionErrors } from '../../../constants/errors/exeptionsErrors';
import { Phone } from './models/phone.schema';

@Injectable()
export class PhoneService {
  constructor(
    @InjectModel(Phone.name) private phoneModel: Model<Phone>,
  ) {
  }

  createPhone(property: { phoneNumber: string, code: string }): Observable<any> {
    return from(this.phoneModel.findOne({ phoneNumber: property.phoneNumber })).pipe(
      mergeMap((response) => {
        if (response) {
          throw exceptionErrors.throwForbiddenError('phone create error');
        } else {
          const newPhone = new this.phoneModel({ ...property });
          return from(newPhone.save()).pipe(
            catchError(() => {
              throw exceptionErrors.throwForbiddenError;
            }),
            map((role) => role || null),
          );
        }
      }),
    );
  }

  updatePhone(criteria, data: any): Observable<any> {
    return from(this.phoneModel.updateOne(criteria, data)).pipe(
      map((phone) => phone || null),
    );
  }

  getPhone(criteria): Observable<Phone> {
    return from(this.phoneModel.findOne(criteria)).pipe(
      map((phone) => phone || null)
    )
  }

  sendVerifyMessage(){
    return
  }
}
