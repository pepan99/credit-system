import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/users.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userService: ClientProxy,
  ) { }

  async getTasksForUser(id: string) {
    const pattern = { cmd: 'getTasksForUser' };
    return this.userService.send<any>(pattern, id);
  }

  async getUsers() {
    const pattern = { cmd: 'getUsers' };
    return this.userService.send<any>(pattern, {});
  }

  async createUser(createUserDto: CreateUserDto) {
    const pattern = { cmd: 'createUser' };
    return this.userService.send<any>(pattern, createUserDto);
  }
}
