import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find s.env file");
}

export default {
  port: process.env.PORT,
  database: {
    type: process.env.TYPEORM_CONNECTION,
    url: process.env.TYPEORM_HOST,
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    logging: Boolean(process.env.TYPEORM_LOGGING),
  },
  token: {
    access_token_secret: String(process.env.ACCESS_TOKEN_SECRET),
    access_token_life: process.env.ACCESS_TOKEN_LIFE,
    refresh_token_secret: String(process.env.REFRESH_TOKEN_SECRET),
    refresh_token_life: process.env.REFRESH_TOKEN_LIFE,
  },
};
