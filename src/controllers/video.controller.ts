import { Request, Response } from 'express';
import Video from '../entity/video.entity';
import BaseController from './base.controller';
import VideoService from '../services/video.service';

export default class VideoController extends BaseController<VideoService, Video> {
  constructor() {
    super(VideoService);
  }

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.baseService.findAll();
      res.send(this.successEntity(200, users));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const video = await this.baseService.findOne(id);
      res.send(this.successEntity(200, video));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const video: Video = Object.assign(new Video(), req.body) as Video;
      const videoCreate = await this.baseService.create(video);

      res.send(this.successEntity(201, videoCreate));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const video: Video = Object.assign(new Video(), req.body) as Video;
      video.id = req.params.id;

      const videoUpdate = await this.baseService.update(video);

      res.send(this.successEntity(200, videoUpdate));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const videoDelete = await this.baseService.delete(id);
      res.send(this.successEntity(200, videoDelete));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  sharedVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { idUser, idVideo } = req.body;
      const userVideo = await this.baseService.shared(idUser, idVideo);
      res.send(this.successEntity(200, userVideo.sharedVideos));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };
}
