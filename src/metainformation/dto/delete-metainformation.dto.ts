import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteMetainformationDto {
  @IsNumber()
  @ApiModelProperty()
  readonly id: number;
}
