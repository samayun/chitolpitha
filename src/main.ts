import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core';
import { host,port } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`🚀 Server started http://${host}:${port} 🚀🚀🚀`);
  console.log(`🚀 Server ready at http://${host}:${port}/graphiql`);
}
bootstrap();
