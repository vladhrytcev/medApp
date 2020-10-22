import { ObjectID } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResponseUniversityInfoDto {
  @ApiModelProperty({ example: 1 })
  readonly id: ObjectID;

  @ApiModelProperty({ example: 'KPI' })
  readonly name: string;

  @ApiModelProperty({ example: '00001' })
  readonly postcode: string;

  @ApiModelProperty({ example: 'London' })
  readonly city: string;

  @ApiModelProperty({ example: 'UK' })
  readonly country: string;
};
