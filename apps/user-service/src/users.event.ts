import { IEvent } from '@nestjs/cqrs';

export class UserCreatedEvent implements IEvent {
  constructor(
    readonly id: string,
    readonly email: string,
  ) {}
}
