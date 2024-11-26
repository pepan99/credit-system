import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './users.command';
import { UserRepository } from './users.repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private publisher: EventPublisher,
    private repository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    console.log('Command received: ', command);
    const { email, password } = command;

    const user = this.publisher.mergeObjectContext(
      await this.repository.create(email, password),
    );
    return user;
  }
}
