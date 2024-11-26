export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class GetUserByIdCommand {
  constructor(public readonly id: string) {}
}
