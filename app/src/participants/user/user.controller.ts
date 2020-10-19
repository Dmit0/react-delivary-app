import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('restaurants')
export class UserController {

  constructor(private userService: UserService) {
  }

  // @Get()
  // updateUser(): any {
  //   return this.userService.createUser();
  // }
}