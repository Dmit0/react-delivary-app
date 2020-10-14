import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private restaurantModel: Model<User>,
  ) {
  }

  getUser() {
    return
  }
  createUser(){
    return
  }
  updateUser(){
    return
  }
}