import { Router } from 'express';
import UserVideoController from '../controllers/user-video.controller';

const route = Router();
const userVideoController = new UserVideoController();

export default (app: Router): void => {
  app.use('/uservideos', route);

  /**
   * @typedef UserVideo
   * @property {User.model} user
   * @property {Array.<Video>} videos
   * @property {Array.<Video>} sharedVideo
   */

  /**
   * @route GET /uservideos
   * @group UserVideo - Operations about UserVideo
   * @returns {Array.<UserVideo>} 200 - An array of user info
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.get('/', userVideoController.findAll);

  /**
   * @route POST /uservideos
   * @group UserVideo
   * @param {UserVideo.model} uservideos.body.required
   * @returns {UserVideo.model} 201 - Return create user
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.post('/', userVideoController.create);

  /**
   * @route get /uservideos/{id}
   * @group UserVideo
   * @param {string} id.path.required
   * @returns {UserVideo.model} 200 - Return found user
   * @returns {Error} 400 - User not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.get('/:id', userVideoController.findOne);

  /**
   * @route POST /uservideos/{id}
   * @group UserVideo
   * @param {string} id.path.required
   * @param {UserVideo.model} uservideos.body.required
   * @returns {UserVideo.model} 200 - Return update user
   * @returns {Error} 400 - User not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.post('/:id', userVideoController.update);

  /**
   * @route delete /uservideos/{id}
   * @group UserVideo
   * @param {string} id.path.required
   * @returns {string} 200 - Return id deleted user
   * @returns {Error} 400 - User not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.delete('/:id', userVideoController.delete);
};
