import { Request, Response } from 'express';
import BaseController from './base.controller';
import UserVideoService from '../services/user-video.service';
import UserVideo from '../entity/user-video.entity';

export default class UserVideoController extends BaseController<
  UserVideoService,
  UserVideo
> {
  constructor() {
    super(UserVideoService);
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
      const userVideo = await this.baseService.findOne(id);
      res.send(this.successEntity(200, userVideo));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const userVideo: UserVideo = req.body;

      const userVideoCreate = await this.baseService.create(userVideo);

      res.send(this.successEntity(201, userVideoCreate));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const userVideo: UserVideo = req.body;
      userVideo.user.id = req.params.id;

      const videoUpdate = await this.baseService.update(userVideo);

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

  addVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const videoDelete = await this.baseService.delete(id);
      res.send(this.successEntity(200, videoDelete));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };
}
