import bodyParser from 'body-parser';
import * as express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from '../routes';

export default (app: express.Application): void => {
  app.enable('trust proxy');
  app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded());
  app.use(morgan('tiny'));

  const corsOptions = {
    origin: 'http://localhost:4200',
  };

  app.use(cors(corsOptions));

  app.use('/', routes);

  app.use(
    (
      err: ErrorHttp,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
      });
    },
  );
};
