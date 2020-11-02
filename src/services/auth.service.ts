import crypto from 'crypto';
import {
  ERROR_AUTHORIZATION,
  ERROR_INCORRECT_CREDENTIALS,
} from '../constants/error';
import User from '../entity/user.entity';
import UserService from './users.service';

export default class AuthService {
  userService: UserService = new UserService();

  private static currentUser: User | undefined;

  getCurrentUser(): User {
    if (AuthService.currentUser) {
      return AuthService.currentUser;
    }
    throw new Error(ERROR_AUTHORIZATION);
  }

  async autoLogin(name: string, password: string): Promise<void> {
    AuthService.currentUser = await this.userService.findByName(name);

    if (AuthService.currentUser.password !== this.getHash(password)) {
      throw new Error(ERROR_INCORRECT_CREDENTIALS);
    }
  }

  logOut(): void {
    AuthService.currentUser = undefined;
  }

  private getHash(text:string):string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }
}
