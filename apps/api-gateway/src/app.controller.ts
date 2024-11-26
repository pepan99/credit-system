import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/users.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/api/users')
  createUser(createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Get('/api/users')
  getUsers() {
    return this.appService.getUsers();
  }
}
