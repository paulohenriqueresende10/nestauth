import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
