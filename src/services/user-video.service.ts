import BaseService from './base.service';
import UserVideo from '../entity/user-video.entity';
import UserVideoRepository from '../repositories/user-video.repository';

export default class UserVideoService extends BaseService<
  UserVideo,
  UserVideoRepository
> {
  constructor() {
    super(UserVideoRepository);
  }

  public findAll(): Promise<UserVideo[]> {
    return this.baseRepository.findAll();
  }

  public findOne(id: string): Promise<UserVideo> {
    return this.baseRepository.findOne(id);
  }

  public async create(userVideo: UserVideo): Promise<UserVideo> {
    await this.validation(userVideo);
    return this.baseRepository.create(userVideo);
  }

  public update(userVideo: UserVideo): Promise<UserVideo> {
    return this.baseRepository.update(userVideo);
  }

  public delete(id: string): Promise<string> {
    return this.baseRepository.delete(id);
  }

  public findOneByUserId(id: string): Promise<UserVideo> {
    return this.baseRepository.findOneByUserId(id);
  }
}
