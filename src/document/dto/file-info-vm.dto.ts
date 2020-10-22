import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileInfoVm {
  @IsNumber()
  @ApiModelProperty()
  @Expose()
  readonly length: number;

  @IsNumber()
  @ApiModelProperty()
  @Expose()
  readonly chunkSize: number;

  @IsString()
  @ApiModelProperty()
  @Expose()
  readonly filename: string;

  @IsString()
  @ApiModelProperty()
  @Expose()
  readonly md5: string;

  @IsString()
  @ApiModelProperty()
  @Expose()
  readonly contentType: string;
}
