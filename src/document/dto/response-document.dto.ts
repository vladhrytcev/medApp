import { ObjectID } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResponseDocumentInfoDto {
  @ApiModelProperty({ example: 1 })
  readonly id: ObjectID;

  @ApiModelProperty({ example: '' })
  readonly type: string;

  @ApiModelProperty({ example: 1 })
  readonly size: number;

  @ApiModelProperty({ example: '' })
  readonly name: string;

  @ApiModelProperty({ example: '' })
  readonly path: string;

  @ApiModelProperty({ example: '' })
  readonly mimetype: string;
};
