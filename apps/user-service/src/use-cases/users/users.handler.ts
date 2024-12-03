import {
  CommandHandler,
  EventPublisher,
  EventsHandler,
  ICommandHandler,
  IEventHandler,
  IQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { CreateUserCommand } from './users.command';
import { UserRepository } from '../../infractructure/data/users-repository/users.repository';
import { GetUserByIdQuery } from './user.query';
import { UserCreatedEvent } from 'src/core/events/users.event';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private publisher: EventPublisher,
    private repository: UserRepository,
  ) { }

  async execute(command: CreateUserCommand) {
    console.log('Command received: ', command);
    const { email, password } = command;

    const user = this.publisher.mergeObjectContext(
      await this.repository.create(email, password),
    );
    user.createUser();
    user.commit();
    return user;
  }
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private repository: UserRepository) { }

  async execute(query: GetUserByIdQuery) {
    console.log('Query received: ', query);
    return this.repository.findById(query.id);
  }
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent> {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) { }

  async handle(event: UserCreatedEvent) {
    console.log('Event received: ', event);
    this.client.emit('user_created', event);
  }
}
