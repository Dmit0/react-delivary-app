import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { User } from './models/user.schema';
import { from, Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
  }

  getUser(property: any): Observable<User> {
    return from(this.userModel.findOne({ property })).pipe(
      map((user) => user || null),
    );
  }

  createUser(user: any): Observable<User> {
    return from(this.userModel.create(user));//проверить
  }

  updateUser() {
    return;
  }
}