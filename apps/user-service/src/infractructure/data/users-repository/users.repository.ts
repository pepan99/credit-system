import { User } from 'src/core/entities/users.entity';

export class UserRepository {
  private users: User[] = [new User('john@gmail.com', '123456')];

  async create(email: string, password: string): Promise<User> {
    const newUser = new User(email, password);
    this.users.push(newUser);
    return newUser;
  }

  async update(userForUpdate: User): Promise<User> {
    this.users.push(userForUpdate);
    const updatedUser = this.users.find((user) => user.id === userForUpdate.id);
    return updatedUser;
  }

  async findById(id: number): Promise<User> {
    const user = this.users.find((user) => +user.id === id);
    if (user === undefined) {
      throw new Error('Account not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
