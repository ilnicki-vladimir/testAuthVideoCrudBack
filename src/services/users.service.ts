import crypto from 'crypto';
import BaseService from './base.service';
import { ERROR_NAME_ALREADY_EXISTS } from '../constants/error';
import UserRepository from '../repositories/users.repository';
import User from '../entity/user.entity';
import UserVideoService from './user-video.service';
import UserVideo from '../entity/user-video.entity';

export default class UserService extends BaseService<User, UserRepository> {
  userVideoService: UserVideoService = new UserVideoService();

  constructor() {
    super(UserRepository);
  }

  public findAll(): Promise<User[]> {
    return this.baseRepository.findAll();
  }

  public findOne(id: string): Promise<User> {
    return this.baseRepository.findOne(id);
  }

  public async create(user: User): Promise<User> {
    let userCreate = user;
    userCreate.password = this.getHash(user.password);
    await this.validationUser(userCreate);
    userCreate = await this.baseRepository.create(userCreate);
    const userVideo = new UserVideo();
    userVideo.user = userCreate;
    await this.userVideoService.create(userVideo);

    return userCreate;
  }

  public async update(user: User): Promise<User> {
    await this.validationUser(user);
    return this.baseRepository.update(user);
  }

  public delete(id: string): Promise<string> {
    return this.baseRepository.delete(id);
  }

  public async findByName(name: string): Promise<User> {
    return this.baseRepository.findByName(name);
  }

  private async validationUser(user: User): Promise<void> {
    await this.validation(user);
    let userDto: User;
    try {
      userDto = await this.baseRepository.findByName(user.name);
    } catch {
      return;
    }
    if (
      (user.id === null && userDto !== null)
      || (userDto?.id !== null && !(user.id === userDto?.id))
    ) {
      throw new Error(ERROR_NAME_ALREADY_EXISTS);
    }
  }

  private getHash(text:string):string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }
}
