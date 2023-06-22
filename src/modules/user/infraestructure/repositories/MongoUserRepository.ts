/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserSchemaModel } from '../schema/UserSchema';

import { User } from '../../domain/models/User';
import { UserRepository } from '../../domain/ports/UserRepository';

export class MongoUserRepository implements UserRepository {
  createAccount(newUser: User): Promise<User> {
    return UserSchemaModel.create(newUser);
  }
  login(user: User): Promise<{ token: string }> {
    const { email } = user;
    return UserSchemaModel.findOne({ email }).exec() as any;
  }
  findUserByEmail(email: string): Promise<User | null> {
    return UserSchemaModel.findOne({ email }).exec() as any;
  }
}
