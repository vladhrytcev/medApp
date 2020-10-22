import { IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateEducationDto {
  @IsDate()
  @ApiModelProperty()
  readonly startDate: string;

  @IsDate()
  @ApiModelProperty()
  readonly endDate: string;
}
