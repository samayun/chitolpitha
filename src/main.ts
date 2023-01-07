import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { host,port } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(port);
  console.log(`🚀 Server started http://${host}:${port} 🚀🚀🚀`);
}
bootstrap();
