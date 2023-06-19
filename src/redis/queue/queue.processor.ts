import { Logger } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { QUEUE_NAME, events } from '@common/constants';

@Processor(QUEUE_NAME)
export class QueueConsumer {
  private readonly logger = new Logger(this.constructor.name);

  @Process({ name: events.TASK_QUEUE })
  async taskRunHere(job: Job<string>, cb: DoneCallback) {
    this.logger.log(`TASK_QUEUE job ${job.id} of type ${job.name} ...`);

    cb(null, { success: true });

    return job;
  }
}
