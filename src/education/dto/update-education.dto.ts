import { IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateEducationDto {
  @IsDate()
  @ApiModelProperty()
  readonly startDate: string;

  @IsDate()
  @ApiModelProperty()
  readonly endDate: string;
}
