import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Organisation } from '../organisation.entity';

export class ResponseByCreateOrganisationDto extends Organisation {
  @IsString()
  @ApiModelProperty()
  readonly password: string;
}
