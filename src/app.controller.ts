import { Request } from 'express';
import { AppService } from './app.service';
// import { getRedisOptions } from '@config';
import { APP_SERVICE } from '@common/shared/constants';
import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  // client: ClientProxy;

  // constructor(private readonly appService: AppService) {
  //   this.client = ClientProxyFactory.create(getRedisOptions);
  // }

  constructor(
    private readonly appService: AppService,
    @Inject(APP_SERVICE) private client: ClientProxy,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/pubsub')
  async tests(@Req() req: Request) {
    console.log(this.client);
    const pattern = { topic: 'pubsub' };
    const data = { name: 'REDIS', url: req.originalUrl };
    console.log({ app: data });
    return this.client.send(pattern, data);
  }

  @EventPattern({ topic: 'pubsub' })
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log(data);
    return data;
  }
}
