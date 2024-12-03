import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/users.event';

export class User extends AggregateRoot {
  public id: number;
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
    this.id = Math.floor(Math.random() * 1000);
  }

  createUser() {
    this.apply(new UserCreatedEvent(this.id, this.email));
  }
}
