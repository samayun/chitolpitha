import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiPropertyOptional({ type: String, default: 'Image' })
  type?: string; // 'Image' | 'Pdf' | 'Video'
}
