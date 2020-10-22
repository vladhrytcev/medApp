import { IsString, IsNumber, IsOptional, IsBase64 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly type?: string;

  @IsNumber()
  @IsOptional()
  @ApiModelProperty()
  readonly size?: number;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly path: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly mimetype: string;

  @IsBase64()
  @IsOptional()
  @ApiModelProperty()
  readonly binary?: Buffer;
}
