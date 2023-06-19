import { MESSAGE_BROKER } from '@common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject(MESSAGE_BROKER) private readonly client: ClientProxy) {}

  getHello() {
    const pattern = { topic: 'users' };
    return this.client.send(pattern, []);
  }
}
