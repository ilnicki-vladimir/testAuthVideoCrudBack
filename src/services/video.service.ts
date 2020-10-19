import BaseService from './base.service';
import Video from '../entity/video.entity';
import VideoRepository from '../repositories/video.repository';
import AuthService from './auth.service';
import UserVideoService from './user-video.service';
import UserVideo from '../entity/user-video.entity';

export default class VideoService extends BaseService<Video, VideoRepository> {
  authService: AuthService = new AuthService();

  userVideoService: UserVideoService = new UserVideoService();

  constructor() {
    super(VideoRepository);
  }

  public findAll(): Promise<Video[]> {
    return this.baseRepository.findAll();
  }

  public findOne(id: string): Promise<Video> {
    return this.baseRepository.findOne(id);
  }

  public async create(video: Video): Promise<Video> {
    const videoCreate:Video = video;
    await this.validation(videoCreate);
    const userVideo = await this.userVideoService.findOneByUserId(
      this.authService.getCurrentUser().id,
    );
    videoCreate.userVideo = userVideo;

    return this.baseRepository.create(videoCreate);
  }

  public async update(video: Video): Promise<Video> {
    await this.validation(video);
    return this.baseRepository.update(video);
  }

  public delete(id: string): Promise<string> {
    return this.baseRepository.delete(id);
  }

  public async shared(idUser: string, idVideo: string): Promise<UserVideo> {
    const userVideo = await this.userVideoService.findOneByUserId(idUser);
    const video = await this.findOne(idVideo);
    userVideo.sharedVideos.push(video);

    return this.userVideoService.update(userVideo);
  }
}
