import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Payload } from '../utils/payload';
import AuthService from '../services/auth.service';
import config from '../config';
import User from '../entity/user.entity';
import {
  ERROR_INCORRECT_CREDENTIALS,
  LOGOUT_SUCCESS,
} from '../constants/error';

let refreshTokens: string[] = [];
const authService: AuthService = new AuthService();

export async function login(req: Request, res: Response): Promise<void> {
  const { name, password } = req.body;

  await authService.autoLogin(name, password);

  const user: User = await authService.getCurrentUser();

  if (user) {
    const accessToken = jwt.sign(
      { username: user.name },
      config.token.access_token_secret,
      { expiresIn: config.token.access_token_life },
    );
    const refreshToken = jwt.sign(
      { username: user.name },
      config.token.refresh_token_secret,
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
    });
  } else {
    res.send(ERROR_INCORRECT_CREDENTIALS);
  }
}

export function refresh(req: Request, res: Response): void {
  const token = req.headers.refresh as string;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  if (!refreshTokens.includes(token)) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(
    token,
    config.token.refresh_token_secret,
    (
      err:
        | jwt.JsonWebTokenError
        | jwt.NotBeforeError
        | jwt.TokenExpiredError
        | null,
      user: Payload | unknown | undefined,
    ): Response<void> | void => {
      const payload = user as Payload;

      if (err) {
        res.sendStatus(403);
        return;
      }

      const accessToken = jwt.sign(
        { username: payload.username },
        config.token.access_token_secret,
        { expiresIn: config.token.access_token_life },
      );

      res.json({
        accessToken,
      });
    },
  );
}

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Response<void> | void {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.sendStatus(401);
  }

  return jwt.verify(
    token,
    config.token.access_token_secret,
    (
      err:
        | jwt.JsonWebTokenError
        | jwt.NotBeforeError
        | jwt.TokenExpiredError
        | null,
      user: Payload | unknown | undefined,
    ): Response<void> | void => {
      const payload = user as Payload;

      if (err) {
        res.sendStatus(403);
      }
      if (payload.username !== authService.getCurrentUser().name) {
        res.sendStatus(403);
      }
      next();
    },
  );
}

export function logout(req: Request, res: Response): void {
  const token = req.headers.refresh as string;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  authService.logOut();

  res.send(LOGOUT_SUCCESS);
}
