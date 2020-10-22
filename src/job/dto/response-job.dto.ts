import { ObjectID } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResponseJobDto {
  @ApiModelProperty({ example: 1 })
  readonly id: ObjectID;

  @ApiModelProperty({ example: 'To heal' })
  readonly title: string;

  @ApiModelProperty({ example: [1] })
  readonly dates: Array<ObjectID>;

  @ApiModelProperty({ example: [1] })
  readonly salary: Array<ObjectID>;

  @ApiModelProperty({ example: 1 })
  readonly field: ObjectID;

  @ApiModelProperty({ example: 1 })
  readonly orig_dept: ObjectID;

  @ApiModelProperty({ example: 'example' })
  readonly subtitle: string;

  @ApiModelProperty({ example: 'true' })
  readonly accomodation: boolean;

  @ApiModelProperty({ example: 1 })
  readonly state: ObjectID;

  @ApiModelProperty({ example: [1] })
  readonly applicants: Array<ObjectID>;

  @ApiModelProperty({ example: 1 })
  readonly organisation: ObjectID;

  @ApiModelProperty({ example: 1 })
  readonly jobType: ObjectID;

  @ApiModelProperty({ example: 1 })
  readonly jobOperation: ObjectID;

  @ApiModelProperty({ example: 1 })
  readonly payment: ObjectID;
}
