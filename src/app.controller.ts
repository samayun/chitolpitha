import {
  ClientProxy,
  EventPattern,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { Request } from 'express';
import { getRedisOptions } from '@main';
import { AppService } from './app.service';
import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
  client: ClientProxy;

  constructor(private readonly appService: AppService) {
    this.client = ClientProxyFactory.create(getRedisOptions);
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/pubsub')
  tests(@Req() req: Request) {
    console.log(this.client);
    const pattern = { topic: 'pubsub' };
    const data = { name: 'REDIS', url: req.originalUrl };
    return this.client.send(pattern, data);
  }

  @EventPattern({ topic: 'pubsub' })
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log(data);
    return data;
  }
}
