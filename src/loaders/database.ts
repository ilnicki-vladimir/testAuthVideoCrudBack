import { Connection, createConnection, ConnectionOptions } from 'typeorm';
import config from '../config';
import UserVideo from '../entity/user-video.entity';
import Video from '../entity/video.entity';
import User from '../entity/user.entity';

export default async (): Promise<Connection> => {
  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    username: config.database.username,
    password: config.database.password,
    synchronize: config.database.synchronize,
    // logging: config.database.logging,
    entities: [User, Video, UserVideo],
  };
  const connection = await createConnection(connectionOptions);
  return connection;
};
