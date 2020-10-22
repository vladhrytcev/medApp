import { ObjectID } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { PersonRole } from '../../common/enums/person-role.enum';

export class ResponseOrganisationInfoDto {
  @ApiModelProperty({ example: 1 })
  readonly id: ObjectID;

  @ApiModelProperty({ example: 'UN' })
  readonly name: string;

  @ApiModelProperty({ example: 'broadway' })
  readonly address: string;

  @ApiModelProperty({ example: '00001' })
  readonly postcode: string;

  @ApiModelProperty({ example: 'London' })
  readonly city: string;

  @ApiModelProperty({ example: 'Poland' })
  readonly country: string;

  @ApiModelProperty({ example: 'http://google.com' })
  readonly url: string;

  @ApiModelProperty({ example: 'http://google.com' })
  readonly logo: string;

  @ApiModelProperty({ example: 'http://google.com' })
  readonly pics: string;

  @ApiModelProperty({ enum: PersonRole, example: PersonRole.ORG_SUB })
  readonly role: PersonRole;
}
