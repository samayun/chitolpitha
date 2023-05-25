import { MessagePattern } from '@nestjs/microservices';

// @MessagePattern('message')
export class UserControler {
  @MessagePattern('message')
  handleMessage(message: any) {
    console.log('Received message:', message);
    // Process the message as needed
    return message;
  }
}
