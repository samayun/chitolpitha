import {
  Transport,
  NatsOptions,
  RedisOptions as RedisMSOptions,
} from '@nestjs/microservices';
import { RedisOptions } from 'ioredis';

export function env<T>(key: string, defaultValue: string | number = '') {
  return (process.env[key] as unknown as T) || (defaultValue as unknown as T);
}

const config = {
  server: {
    host: env<string>('HOST', 'http://localhost'),
    port: env<number>('PORT', 2024),
  },

  cors: {
    origin: (process.env.UI as string)?.split(',') || '*',
  },

  api: {
    globalPrefix: env<string>('API_PREFIX', 'api'),
    version: env<string>('API_VERSION', 'v1'),
    swaggerPrefix: env<string>('SWAGGER_PREFIX', 'docs'),
  },

  db: {
    url: env<string>('DB_URL', ''),
    type: env('DB_TYPE', 'postgres'),
    host: env('DB_HOST', 'localhost'),
    port: env<number>('DB_PORT', 5432),
    username: env('DB_USER', 'postgres'),
    password: env('DB_PASSWORD', 'secret'),
    database: env('DB_NAME', 'test'),
  },
  aws: {
    region: env<string>('DEFAULT_REGION', 'us-east-1'),
    endpoint: process.env.AWS_ENDPOINT,
    // ...(process.env.AWS_ENDPOINT && { endpoint: process.env.AWS_ENDPOINT }),
    accessKeyId: env<string>('AWS_ACCESS_KEY_ID', 'admin'),
    secretAccessKey: env<string>('AWS_SECRET_ACCESS_KEY', 'admin'),

    bucket: env<string>('AWS_BUCKET', 'mybucket'),
    path: env<string>('AWS_PATH', 'chitolpitha-uploads'),
  },

  redis: {
    url: env<string>('REDIS_URL'),
    host: env<string>('REDIS_HOST', 'redis'),
    port: env<number>('REDIS_PORT', 6379),
    username: env('REDIS_USER'),
    password: env('REDIS_PASSWORD'),
    db: env('REDIS_DB', 0),
  },

  redisPublisher: {
    host: env('REDIS_HOST', 'redis'),
    port: env<number>('REDIS_PORT', 6379),
    username: env('REDIS_USER'),
    password: env('REDIS_PASSWORD'),
    db: env('REDIS_DB', 1),
  } as RedisOptions,

  redisSubscriber: {
    host: env('REDIS_HOST', 'redis'),
    port: env<number>('REDIS_PORT', 6379),
    username: env('REDIS_USER'),
    password: env('REDIS_PASSWORD'),
    db: env('REDIS_DB', 2),
  } as RedisOptions,

  nats: {
    url: env<string>('NATS_URL', 'nats://nats:4222'),
  },

  swagger: {
    title: env<string>('SWAGGER_TITLE', 'Test API'),
    description: env<string>('SWAGGER_DESCRIPTION', 'The Test API description'),
  },
};

export const getRedisOptions: RedisMSOptions = {
  transport: Transport.REDIS,
  options: {
    // url: config.redis.url,
    host: config.redis.host,
    port: config.redis.port,
  },
};

export const getNatsOptions: NatsOptions = {
  transport: Transport.NATS,
  options: {
    servers: config.nats.url,
  },
};

export default config;
export { config };

process.env.NODE_ENV === 'development' && console.log(config);
