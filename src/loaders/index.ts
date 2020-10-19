import express from 'express';
import 'reflect-metadata';
import database from './database';
import server from './server';
import swagger from './swagger';

export default async (app: express.Application):Promise<void> => {
  await database();
  console.log('DB loaded and connected');

  await server(app);
  console.log('Server loaded');

  await swagger(app);
  console.log('Swagger start');
};
