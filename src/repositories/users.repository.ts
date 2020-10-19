import BaseRepository from './base.repository';
import { ERROR_DELETE, ERROR_USER_NOT_FOUND } from '../constants/error';
import User from '../entity/user.entity';

export default class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  findAll(): Promise<User[]> {
    return this.baseRepository.find({ select: ['name', 'email', 'id'] });
  }

  async findOne(id: string): Promise<User> {
    try {
      const user: User = await this.baseRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw new Error(ERROR_USER_NOT_FOUND);
    }
  }

  async update(user: User): Promise<User> {
    await this.findOne(user.id);
    await this.baseRepository.update(user.id, user);
    return this.baseRepository.findOneOrFail(user.id);
  }

  create(user: User): Promise<User> {
    return this.baseRepository.save(user);
  }

  async delete(id: string): Promise<string> {
    await this.findOne(id);
    const deleteResult = await this.baseRepository.delete(id);
    if (deleteResult.affected) {
      return id;
    }
    throw new Error(ERROR_DELETE);
  }

  async findByName(name: string): Promise<User> {
    try {
      const user: User = await this.baseRepository.findOneOrFail({
        where: {
          name,
        },
      });
      return user;
    } catch (error) {
      throw new Error(ERROR_USER_NOT_FOUND);
    }
  }
}
