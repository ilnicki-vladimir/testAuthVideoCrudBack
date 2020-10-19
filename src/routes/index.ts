import { Router } from 'express';
import users from './users';
import auth from './auth';
import video from './video';
import userVideo from './user-video';

const router = Router();
auth(router);
users(router);
video(router);
userVideo(router);

export default router;
