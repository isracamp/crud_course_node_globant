import { User } from '../../domain/models/User';
import { UserRepository } from '../../domain/ports/UserRepository';

export class UserUseCase {
  // add dependency injection
  constructor(private userRepository: UserRepository) {}

  async createAccount(newUser: User): Promise<User> {
    return this.userRepository.createAccount(newUser);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    return this.userRepository.login({ email, password });
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }
}
