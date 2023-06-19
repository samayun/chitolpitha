import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_MESSAGE_BROKER } from '@common/constants';

@Injectable()
export class AppService {
  constructor(
    @Inject(REDIS_MESSAGE_BROKER) private readonly client: ClientProxy,
  ) {}

  getHello() {
    const pattern = { topic: 'users' };
    return this.client.send(pattern, []);
  }
}
