import config from '@config/index';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.server.port);
  console.log(
    `🚀 Server started http://${config.server.host}:${config.server.port} 🚀🚀🚀`,
  );
  console.log(
    `🚀 Server ready at http://${config.server.host}:${config.server.port}/graphql`,
  );
}
bootstrap();
