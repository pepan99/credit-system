import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateUserHandler,
  UserCreatedEventHandler,
} from './use-cases/users/users.handler';
import { UsersController } from './application/controllers/users.controller';
import { UsersService } from './use-cases/users/users.service';
import { UserRepository } from './infractructure/data/users-repository/users.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

export const commandHandlers = [CreateUserHandler];
export const eventHandlers = [UserCreatedEventHandler];

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:pwd@localhost:5672'],
          queue: 'users-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    ...commandHandlers,
    ...eventHandlers,
  ],
})
export class UsersModule { }
