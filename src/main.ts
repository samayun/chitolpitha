import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './config/server';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(port);
  console.log(`🚀 Server started http://localhost:${port} 🚀🚀🚀`);
}
bootstrap();
