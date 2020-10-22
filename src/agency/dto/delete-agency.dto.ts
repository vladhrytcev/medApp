import { IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteAgencyDto {
  @IsArray()
  @ApiModelProperty()
  readonly id: Array<string>;
};
