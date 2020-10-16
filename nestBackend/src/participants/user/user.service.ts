import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import {  } from '../../auth/models/auth.models';
import { User } from './models/user.schema';
import { from, Observable, of } from 'rxjs';
import { IUserCreate } from './models/user.types';

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
  //IUserCreate
  createUser(user: any): Observable<User> {
    const newUser = new this.userModel(user)
    return from(newUser.save).pipe(
      map((user)=>user || null)//check wat is return frm save method
    )
  }

  updateUser() {
    return;
  }
}