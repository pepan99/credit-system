import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from './users.event';

export class User extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {
    super();
  }

  createUser() {
    this.apply(new UserCreatedEvent(this.id, this.email));
  }
}
