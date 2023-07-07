import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import LoadSwaggerModule from '@loaders/swagger.module';
import config, { getNatsOptions, getRedisOptions } from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(getRedisOptions);
  console.log(
    `REDIS: microservice connected.. { ${JSON.stringify(
      getRedisOptions.options,
    )} }`,
  );

  app.connectMicroservice(getNatsOptions);

  console.log(
    `NATS: microservice connected.. { ${JSON.stringify(
      getNatsOptions.options,
    )} }`,
  );

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === 'development') LoadSwaggerModule(app);

  await app.listen(config.server.port);

  console.log(
    `🚀 Server started http://${config.server.host}:${config.server.port} 🚀🚀🚀`,
  );
}
bootstrap();
