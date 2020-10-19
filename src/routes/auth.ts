import {
  Router, Response, Request, NextFunction,
} from 'express';
import { login, logout, refresh } from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';

const route = Router();
const userController = new UserController();

export default (app: Router): void => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  app.use('/', route);

  /**
   * @typedef Login
   * @property {string} name
   * @property {string} password
   */

  /**
   * @route POST /login
   * @group Authorization
   * @param {Login.model} login.body.required - name and password
   * @returns {string} 200 - Return access and refresh token
   * @returns {Error} 400 - User not found
   */
  route.post('/login', login);

  /**
   * @route POST /register
   * @group Authorization
   * @param {User.model} user.body.required
   * @returns {User.model} 201 - Return create user
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   */
  route.post('/register', userController.create);

  /**
   * @route GET /refresh
   * @group Authorization
   * @param {string} refresh.header.required
   * @returns {object} 200 - Return access token
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   */
  route.get('/refresh', refresh);

  /**
   * @route GET /logout
   * @group Authorization
   * @param {string} refresh.header.required
   * @returns {string} 200 - Return 'Logout successful'
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   */
  route.get('/logout', logout);
};
