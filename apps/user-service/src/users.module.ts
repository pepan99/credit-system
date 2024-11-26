import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { CreateUserHandler } from './users.handler';
import { CqrsModule } from '@nestjs/cqrs';

export const commandHandlers = [CreateUserHandler];

export const eventHandlers = [];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class UsersModule {}
