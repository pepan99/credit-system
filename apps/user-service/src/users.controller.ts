import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './users.model';
import { UserRepository } from './users.repository';

@Controller('/api/users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private userRepository: UserRepository,
  ) {
    this.userRepository = userRepository;
    this.userService = userService;
  }

  @Get()
  async getUsers() {
    return this.userRepository.findAll();
  }

  @Post()
  async createUser(@Body() userRequest: CreateUserRequest) {
    return this.userService.createUsersCommand(userRequest);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userRepository.findById(+id);
  }
}
