import { Router } from 'express';
import { verifyToken } from '../controllers/auth.controller';
import UserController from '../controllers/user.controller';

const route = Router();
const userController = new UserController();

export default (app: Router): void => {
  app.use('/users', verifyToken, route);

  /**
   * @typedef User
   * @property {string} id
   * @property {string} name
   * @property {string} password
   * @property {string} email
   */

  /**
   * @route GET /users
   * @group User - Operations about user
   * @returns {Array.<User>} 200 - An array of user info
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.get('/', userController.findAll);

  /**
   * @route POST /users
   * @group User
   * @param {User.model} user.body.required
   * @returns {User.model} 201 - Return create user
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.post('/', userController.create);

  /**
   * @route get /users/{id}
   * @group User
   * @param {string} id.path.required
   * @returns {User.model} 200 - Return found user
   * @returns {Error} 400 - User not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.get('/:id', userController.findOne);

  /**
   * @route POST /users/{id}
   * @group User
   * @param {string} id.path.required
   * @param {User.model} user.body.required
   * @returns {User.model} 200 - Return update user
   * @returns {Error} 400 - User not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.post('/:id', userController.update);

  /**
   * @route delete /users/{id}
   * @group User
   * @param {string} id.path.required
   * @returns {string} 200 - Return id deleted user
   * @returns {Error} 400 - User not found
   * @returns {Error} 401 - Unauthorized
   * @returns {Error} 403 - Forbidden
   * @security JWT
   */
  route.delete('/:id', userController.delete);
};
