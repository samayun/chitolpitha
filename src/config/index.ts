export function env<T>(key: string, defaultValue: string | number = '') {
  return (process.env[key] as unknown as T) || (defaultValue as unknown as T);
}

const config = {
  server: {
    host: env('HOST', 'http://localhost'),
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
    url: env<string>(
      'DB_URL',
      'mongodb://chitolpitha:password@db:27017/chitolpitha',
    ),
    type: env('DB_TYPE', 'postgres'),
    host: env('DB_HOST', 'localhost'),
    port: env<number>('DB_PORT', 5432),
    username: env('DB_USER', 'postgres'),
    password: env('DB_PASSWORD', 'secret'),
    database: env('DB_NAME', 'test'),
  },
  redis: {
    url: env<string>('REDIS_URL'),
    host: env('REDIS_HOST', 'redis'),
    port: env<number>('REDIS_PORT', 6379),
    username: env('REDIS_USER'),
    password: env('REDIS_PASSWORD'),
    db: env('REDIS_DB', 0),
  },
};

export default config;
export { config };

process.env.NODE_ENV === 'development' && console.log(config);
