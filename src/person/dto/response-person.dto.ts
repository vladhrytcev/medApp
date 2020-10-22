import { ObjectID } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { PersonRole } from '../../common/enums/person-role.enum';
import { PersonStatus } from '../../common/enums/person-status.enum';

export class ResponsePersonInfoDto {

  @ApiModelProperty({ example: 1 })
  readonly id: ObjectID;

  @ApiModelProperty({ example: 'mail@example.com' })
  readonly email: string;

  @ApiModelProperty({ example: 'John' })
  readonly firstName: string;

  @ApiModelProperty({ example: 'Dow' })
  readonly lastName: string;

  @ApiModelProperty({ enum: PersonRole, example: PersonRole.USER })
  readonly role: PersonRole;

  @ApiModelProperty({ enum: PersonStatus, example: PersonStatus.ACTIVE })
  readonly status: PersonStatus;
}
