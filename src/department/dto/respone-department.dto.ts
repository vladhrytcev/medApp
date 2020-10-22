import { ObjectID } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResponseDepartmentInfoDto {
  @ApiModelProperty({ example: 1 })
  readonly id: ObjectID;

  @ApiModelProperty({ example: 1 })
  readonly organisationId: string;

  @ApiModelProperty({ example: 'SEO' })
  readonly name: string;

  @ApiModelProperty({ example: [1, 2, 3] })
  readonly admins: Array<string>;

  @ApiModelProperty({ example: [1, 2, 3] })
  readonly users: Array<string>;
};
