import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import LoadSwaggerModule from '@loaders/swagger.module';
import config, { getNatsOptions, getRedisOptions } from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice(getRedisOptions);
  const natsMicroservice = app.connectMicroservice(getNatsOptions);

  console.log({ microservice, natsMicroservice });

  await app.startAllMicroservices();

  if (process.env.NODE_ENV === 'development') LoadSwaggerModule(app);

  await app.listen(config.server.port);

  console.log(
    `🚀 Server started http://${config.server.host}:${config.server.port} 🚀🚀🚀`,
  );
}
bootstrap();
