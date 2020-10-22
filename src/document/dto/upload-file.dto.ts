import { IsString, IsBase64, IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @IsBase64()
  @ApiModelProperty()
  readonly file: Buffer;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly size?: number;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly path?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly filename?: string;
}
