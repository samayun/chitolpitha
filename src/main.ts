import config from '@config/index';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

export const getRedisOptions = {
  transport: Transport.REDIS,
  options: {
    // url: config.redis.url,
    host: config.redis.host,
    port: config.redis.port,
  },
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice(getRedisOptions);

  console.log({ microservice, url: config.redis.url });

  await app.startAllMicroservices();

  await app.listen(config.server.port);
  console.log(
    `🚀 Server started http://${config.server.host}:${config.server.port} 🚀🚀🚀`,
  );
  console.log(
    `🚀 Server ready at http://${config.server.host}:${config.server.port}/graphql`,
  );
}
bootstrap();
