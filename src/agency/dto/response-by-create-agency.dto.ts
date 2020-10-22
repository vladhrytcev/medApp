import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Agency } from '../agency.entity';

export class ResponseByCreateAgencyDto extends Agency {
  @IsString()
  @ApiModelProperty()
  readonly password: string;
}
