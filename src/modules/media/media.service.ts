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

    // in case of an error, log it.
    fileStream.on('error', (error) => console.error(error));
    // s3 payload
    const path = process.env.DO_PATH;
    const uploadParams = {
      Bucket: `${process.env.DO_BUCKET}/${path}`,
      Key: Key,
      Body: '',
      ContentType: mimetype,
      ACL: 'public-read',
    };
    uploadParams.Body = fileStream;
    const upload = promisify(this.s3.upload.bind(this.s3));
    const result: any = await upload(uploadParams)
      .then((uploading) => {
        console.log({ uploading });
        return uploading;
      })
      .catch((error: any) => {
        // throw new Error(error.message);
        console.log(error.message);
      });

    if (process.env.NODE_ENV === 'development' && result?.Location) {
      result.Location = result?.Location?.replace('localstack', 'localhost');
    }

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

    console.log({
      type: signedUrlInput?.type,
      key: Key,
      name: filename,
      host:
        process.env.NODE_ENV === 'development'
          ? result?.Location
          : result?.Location?.split('.com')[0] + '.com',
      path,
      s3Url: result?.Location,
    });


    return {
      type: signedUrlInput?.type,
      key: Key,
      name: filename,
      host:
        process.env.NODE_ENV === 'development'
          ? result?.Location
          : result?.Location?.split('.com')[0] + '.com',
      path,
      s3Url: result?.Location,
    }
  }




  async deleteMedia(path: string,key: string) {
    const media = { path, key };

    if (!media) throw new Error(`Failed to delete media`);

    const Key = media?.path + '/' + media?.key;

    await this.s3
      .deleteObject({
        Bucket: this.AWS_S3_BUCKET_IMAGE,
        Key: Key,
      })
      .promise();
    return `Deleted media by Key ${Key}`;
  }

  async deleteManyMedia(path: string,key: string) {
    const media = { path, key };

    const Key = media?.path + '/' + media?.key;

    const deleted = await this.s3
      .deleteObjects({
        Bucket: this.AWS_S3_BUCKET_IMAGE,
        Delete: {
          Objects: [{ Key }],
        },
      })
      .promise();


    console.log({ deleted });

    return `Deleted media by Key ${Key}`;
  }
  async bucketList() {
    const listBucketsResponse = await this.s3.listBuckets().promise();

    return JSON.stringify(listBucketsResponse.Buckets);
  }
}
