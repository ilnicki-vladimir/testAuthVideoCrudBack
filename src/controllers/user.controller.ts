import { Request, Response } from 'express';
import UserService from '../services/users.service';
import User from '../entity/user.entity';
import BaseController from './base.controller';

export default class UserController extends BaseController<UserService, User> {
  constructor() {
    super(UserService);
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
      const user = await this.baseService.findOne(id);
      res.send(this.successEntity(200, user));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: User = Object.assign(new User(), req.body) as User;

      const userCreate = await this.baseService.create(user);

      res.send(this.successEntity(201, userCreate));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const user: User = Object.assign(new User(), req.body) as User;
      const { id } = req.params;
      user.id = id;

      const userUpdate = await this.baseService.update(user);

      res.send(this.successEntity(200, userUpdate));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userDelete = await this.baseService.delete(id);
      res.send(this.successEntity(200, userDelete));
    } catch (error) {
      res.send(this.errorEntity(400, error.message));
    }
  };
}
