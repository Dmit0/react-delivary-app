import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }
}