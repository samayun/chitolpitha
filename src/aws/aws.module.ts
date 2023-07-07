import { AwsService } from './aws.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
