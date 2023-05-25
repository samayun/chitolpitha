const strToBool = (s: string) => new RegExp(/^\s*(true|1|on)\s*$/i).test(s);

export const redisEnabled =
  strToBool(process.env.REDIS_ENABLED as unknown as string) || false;

export const redisHost = process.env.REDIS_HOST || 'redis';
export const redisPort = process.env.REDIS_PORT || 6379;

export const redisUser = process.env.REDIS_USER || '';
export const redisPassword = process.env.REDIS_PASSWORD || '';
export const redisDb = process.env.REDIS_DB || 0;

let url: string;

if (redisEnabled && process.env.REDIS_URL) {
  url = process.env.REDIS_URL;
} else if (redisEnabled && redisUser && redisPassword) {
  url = `redis://${redisUser}:${redisPassword}@${redisHost}:${redisPort}`;
} else if (redisEnabled && redisUser) {
  url = `redis://${redisUser}:${redisPassword}@${redisHost}`;
} else {
  url = `redis://${redisHost}:${redisPort}`;
}

// redis://username:authpassword@127.0.0.1:6379/1
export const redisUrl = url;

export const redisOptions = {
  host: redisHost,
  port: redisPort,
  ...(redisUser && { username: redisUser }),
  ...(redisUser && { password: redisPassword }),
  ...(redisDb && { db: redisDb }),
  url: redisUrl,
  //ttl: 1000
};
