import express from 'express';

const expressSwagger = require('express-swagger-generator');

export default (app: express.Application):void => {
  const options = {
    swaggerDefinition: {
      info: {
        description: 'This is a sample server',
        title: 'Swagger',
        version: '1.0.0',
      },
      host: 'back-end-test-video-crud.herokuapp.com',
      basePath: '/',
      produces: ['application/json', 'application/xml'],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'x-access-token',
          description: '',
        },
      },
    },
    basedir: __dirname, // app absolute path
    files: ['../routes/*.js'], // Path to the API handle folder
  };

  expressSwagger(app)(options);
};
