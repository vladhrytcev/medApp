import { ObjectID } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResponseAgencyInfoDto {
  @ApiModelProperty({ example: 1 })
  readonly id: ObjectID;

  @ApiModelProperty({ example: 'EU' })
  readonly name: string;

  @ApiModelProperty({ example: 'broadway' })
  readonly address: string;

  @ApiModelProperty({ example: '00001' })
  readonly postcode: string;

  @ApiModelProperty({ example: 'Spain' })
  readonly country: string;

  @ApiModelProperty({ example: 'http://google.com' })
  readonly url: string;

  @ApiModelProperty({ example: 'http://google.com' })
  readonly logo: string;

  @ApiModelProperty({ example: [1, 2, 3] })
  readonly contacts: Array<ObjectID>;

  @ApiModelProperty({ example: 1 })
  readonly bankdetails: ObjectID;

  @ApiModelProperty({ example: [1, 2, 3] })
  readonly userStorage: Array<ObjectID>;
}
