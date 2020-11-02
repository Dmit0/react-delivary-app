import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Role} from '../roles/models/Roles';
import { map, mergeMap, tap } from 'rxjs/operators';
import { User } from './models/user.schema';
import { from, Observable, of } from 'rxjs';
import { IUserCreate } from './models/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {
  }

  getUser(property: any): Observable<User> {
    return from(this.userModel.findOne(property)).pipe(
      map((user) => user || null),
    );
  }

  createUser(user: IUserCreate): Observable<User> {
    return this.createOrReturnBaseRole().pipe(
      mergeMap((roleId) => {
        console.log(roleId)
        const newUser = new this.userModel({ ...user, role: roleId });
        return from(newUser.save()).pipe(
          map((user) => user || null),//check wat is return frm save method
        );
      }),
    );
  }

  private createOrReturnBaseRole(): Observable<any> {
    return from(this.roleModel.findOne({ name: 'BASE' })).pipe(
      mergeMap((role) => role && role._id || this.createRole('BASE')));
  }

  private createRole(name): Observable<Role> {
    const newBaseRole = new this.roleModel({ name });
    return from(newBaseRole.save()).pipe(
      map((role) => role._id),
    );
  }

  updateUser() {
    return;
  }
}