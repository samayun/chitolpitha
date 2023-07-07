import config from '@config';
import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';
// import Imgproxy from 'imgproxy';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  AWS_S3_BUCKET_IMAGE = config.aws.bucket;
  spacesEndpoint = new AWS.Endpoint(config.aws.endpoint);

  s3 = new AWS.S3({
    region: config.aws.region,
    ...(config.aws.endpoint && { endpoint: config.aws.endpoint }),
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    s3ForcePathStyle: true,
  });

  async create(mimetype: string, file: any, signedUrlInput: CreateMediaDto) {
    // FIXME: Validate type
    const type = mimetype;
    const Key = `${crypto.randomBytes(24).toString('hex')}.${type
      .split('/')
      .pop()}`;
    const { createReadStream, filename } = await file;
    const fileStream = createReadStream();
    console.log({ filename, signedUrlInput });

    // in case of an error, log it.
    fileStream.on('error', (error) => console.error(error));
    // s3 payload
    const path = config.aws.path;
    const uploadParams = {
      Bucket: `${config.aws.bucket}/${path}`,
      Key: Key,
      Body: '',
      ContentType: mimetype,
      ACL: 'public-read',
    };
    uploadParams.Body = fileStream;
    const upload = promisify(this.s3.upload.bind(this.s3));
    const result = await upload(uploadParams)
      .then((uploading) => {
        console.log({ uploading });
        return uploading;
      })
      .catch((error: any) => {
        // throw new Error(error.message);
        console.log(error.message);
      });
    //imgProxy payload
    // const originalImg = new Imgproxy({
    //   baseUrl: process.env.IMGPROXY_BASE_URL,
    //   key: process.env.IMGPROXY_KEY,
    //   salt: process.env.IMGPROXY_SALT,
    //   encode: true,
    // });

    // console.log({ originalImg });
    // //generate small image
    // const sm = await originalImg
    //   .builder()
    //   .resize('fit', 64, 64, true)
    //   .generateUrl(result.Location);
    // //generate medium image
    // const md = await originalImg
    //   .builder()
    //   .resize('fit', 400, 400, true)
    //   .generateUrl(result.Location);
    // //generate large image
    // const lg = await originalImg
    //   .builder()
    //   .resize('fit', 800, 800, true)
    //   .generateUrl(result.Location);

    // console.log({ result });
    //save to db

    return result;
  }

  async bucketList() {
    const listBucketsResponse = await this.s3.listBuckets().promise();

    return JSON.stringify(listBucketsResponse.Buckets);
  }
}
