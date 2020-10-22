import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateDocumentDto {
  @IsString()
  @ApiModelProperty()
  readonly type: string;

  @IsNumber()
  @ApiModelProperty()
  readonly size: number;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly path: string;

  @IsString()
  @ApiModelProperty()
  readonly mimetype: string;
}
