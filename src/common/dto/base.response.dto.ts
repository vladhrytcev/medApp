import { ApiModelProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiModelProperty({ example: 1 })
  readonly id: number;

  @ApiModelProperty({ example: '2018-10-18T12:41:40.423Z' })
  readonly createdAt: Date;

  @ApiModelProperty({ example: '2018-10-18T12:41:40.423Z' })
  readonly updatedAt: Date;
}
