import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './users.command';
import { CreateUserRequest } from './users.model';

@Injectable()
export class UsersService {
  constructor(private commandBus: CommandBus) { }

  async createUsersCommand(newUser: CreateUserRequest) {
    const { email, password } = newUser;
    return this.commandBus.execute(new CreateUserCommand(email, password));
  }
}
