import BaseRepository from './base.repository';
import { ERROR_DELETE, ERROR_VIDEO_NOT_FOUND } from '../constants/error';
import Video from '../entity/video.entity';

export default class VideoRepository extends BaseRepository<Video> {
  constructor() {
    super(Video);
  }

  findAll(): Promise<Video[]> {
    return this.baseRepository.find();
  }

  async findOne(id: string): Promise<Video> {
    try {
      const video = await this.baseRepository.findOneOrFail(id);
      return video;
    } catch (error) {
      throw new Error(ERROR_VIDEO_NOT_FOUND);
    }
  }

  async update(video: Video): Promise<Video> {
    await this.findOne(video.id);
    await this.baseRepository.update(video.id, video);
    return this.baseRepository.findOneOrFail(video.id);
  }

  create(video: Video): Promise<Video> {
    return this.baseRepository.save(video);
  }

  async delete(id: string): Promise<string> {
    await this.findOne(id);
    const deleteResult = await this.baseRepository.delete(id);
    if (deleteResult.affected) {
      return id;
    }
    throw new Error(ERROR_DELETE);
  }
}
