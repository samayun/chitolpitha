import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { APP_SERVICE } from '@common/shared/constants';

@Injectable()
export class AppService {
  constructor(@Inject(APP_SERVICE) private readonly client: ClientProxy) {}

  getHello() {
    const pattern = { topic: 'users' };
    return this.client.send(pattern, []);
  }
}
