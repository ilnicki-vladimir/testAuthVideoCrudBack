import BaseRepository from './base.repository';
import { ERROR_DELETE, ERROR_USER_NOT_FOUND } from '../constants/error';
import UserVideo from '../entity/user-video.entity';

export default class UserVideoRepository extends BaseRepository<UserVideo> {
  constructor() {
    super(UserVideo);
  }

  findAll(): Promise<UserVideo[]> {
    return this.baseRepository.find({
      relations: ['videos', 'user', 'sharedVideos'],
    });
  }

  async findOne(id: string): Promise<UserVideo> {
    const userVideo = await this.baseRepository.findOne(id, {
      relations: ['videos', 'user', 'sharedVideos'],
    });
    if (!userVideo) {
      throw new Error(ERROR_USER_NOT_FOUND);
    }
    return userVideo;
  }

  async update(userVideo: UserVideo): Promise<UserVideo> {
    await this.findOne(userVideo.id);
    await this.baseRepository.save(userVideo);

    return this.baseRepository.findOneOrFail(userVideo.id);
  }

  create(user: UserVideo): Promise<UserVideo> {
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

  findByName(name: string): Promise<UserVideo[]> {
    return this.baseRepository.find({
      where: {
        name,
      },
      relations: ['videos', 'user', 'sharedVideos'],
    });
  }

  findOneByUserId(id: string): Promise<UserVideo> {
    return this.baseRepository.findOneOrFail({
      where: { user: { id } },
      relations: ['user', 'sharedVideos'],
    });
  }
}
