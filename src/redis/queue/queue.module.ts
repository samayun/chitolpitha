import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from '@common/constants';
import { Global, Module } from '@nestjs/common';
import { QueueConsumer } from './queue.processor';

@Global()
@Module({
  imports: [BullModule.registerQueue({ name: QUEUE_NAME })],
  providers: [QueueConsumer],
  exports: [BullModule.registerQueue({ name: QUEUE_NAME })],
})
export class QueueModule {}
