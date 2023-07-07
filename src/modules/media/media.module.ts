import { Module } from '@nestjs/common';
import { AwsModule } from '@aws/aws.module';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [AwsModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export default class MediaModule {}
