import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserRepository } from 'src/infractructure/data/users-repository/users.repository';
import { CreateUserRequest } from 'src/use-cases/users/users.model';
import { UsersService } from 'src/use-cases/users/users.service';

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
  @MessagePattern({ cmd: 'getUsers' })
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
