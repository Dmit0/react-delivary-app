import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Opportunity } from './models/Opportunities';
import { Role } from './models/Roles';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Opportunity.name) private userModel: Model<Opportunity>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {
  }

  generateBaseRole(){
    return
  }
}
