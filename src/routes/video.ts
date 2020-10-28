import { Router } from 'express';
import { verifyToken } from '../controllers/auth.controller';
import VideoController from '../controllers/video.controller';

const route = Router();
const videoController = new VideoController();

export default (app: Router): void => {
  app.use('/videos', verifyToken, route);

  /**
   * @typedef Video
   * @property {string} id
   * @property {string} name
   * @property {string} description
   * @property {string} link
   */

  /**
   * @route GET /videos
   * @group Video - Operations about video
   * @returns {Array.<Video>} 200 - An array of video info
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.get('/', videoController.findAll);

  /**
   * @route POST /videos
   * @group Video
   * @param {Video.model} video.body.required
   * @returns {Video.model} 201 - Return create video
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.post('/', videoController.create);

  /**
   * @route get /videos/{id}
   * @group Video
   * @param {string} id.path.required
   * @returns {Video.model} 200 - Return found video
   * @returns {Error} 400 - Video not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.get('/:id', videoController.findOne);

  /**
   * @route POST /videos/shared
   * @group Video
   * @param {string} idUser.body.required
   * @param {string} idVideo.body.required
   * @returns {Video.model} 200 - Return update video
   * @returns {Error} 400 - Video not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.post('/shared', videoController.sharedVideo);

  /**
   * @route POST /videos/{id}
   * @group Video
   * @param {string} id.path.required
   * @param {Video.model} video.body.required
   * @returns {Video.model} 200 - Return update video
   * @returns {Error} 400 - Video not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.post('/:id', videoController.update);

  /**
   * @route delete /videos/{id}
   * @group Video
   * @param {string} id.path.required
   * @returns {string} 200 - Return id deleted video
   * @returns {Error} 400 - Video not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.delete('/:id', videoController.delete);
};
