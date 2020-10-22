import { ObjectID } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResponseMetainformationDto {
  @ApiModelProperty({ example: 1 })
  readonly id: ObjectID;

  @ApiModelProperty({ example: 'name' })
  readonly name: string;

  @ApiModelProperty({ example: 'value' })
  readonly value: string;

  @ApiModelProperty({ example: 'skill' })
  readonly type: string;
}
