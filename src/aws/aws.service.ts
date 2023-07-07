import config from '@config';
import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  public s3: AWS.S3;

  constructor() {
    AWS.config.update({
      region: config.aws.region,
      ...(config.aws.endpoint && { endpoint: config.aws.endpoint }),
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    });

    this.s3 = new AWS.S3();
  }

  // Add methods to interact with different AWS services
}
