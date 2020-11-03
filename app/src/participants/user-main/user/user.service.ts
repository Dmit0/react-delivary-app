import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Role} from '../roles/models/Roles';
import { map, mergeMap, tap } from 'rxjs/operators';
import { RolesService } from '../roles/roles.service';
import { User } from './models/user.schema';
import { from, Observable, of } from 'rxjs';
import { IUserCreate } from './models/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly roleService: RolesService,
  ) {
  }

  getUser(property: any): Observable<User> {
    return from(this.userModel.findOne(property)).pipe(
      map((user) => user || null),
    );
  }

  createUser(user: IUserCreate): Observable<User> {
    return this.roleService.findRole({ name:'BASE' }).pipe(
      mergeMap((role) => {
        const newUser = new this.userModel({ ...user, role: role._id });
        return from(newUser.save()).pipe(
          map((user) => user || null),//check wat is return frm save method
        );
      }),
    );
  }

  updateUser() {
    return;
  }
}