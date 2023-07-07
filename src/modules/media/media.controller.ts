import {
  ApiTags,
  ApiConsumes,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { MediaService } from './media.service';
import { Get, Post, Body, Controller, UploadedFile } from '@nestjs/common';

class UploadFileResponse {
  @ApiProperty()
  filename: string;

  @ApiProperty()
  originalname: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  mimetype: string;
}

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async bucketList() {
    return this.mediaService.bucketList();
  }

  @Post()
  // @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'File uploaded successfully',
    type: UploadFileResponse,
  })
  async uploadFile(@Body() body, @UploadedFile() file) {
    return {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
