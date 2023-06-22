import { User } from '../models/User';

export interface UserRepository {
  createAccount: (newEntry: User) => Promise<User>;
  login: (user: User) => Promise<{ token: string }>;
  findUserByEmail(email: string): Promise<User | null>;
}
