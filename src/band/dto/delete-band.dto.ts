import { IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteBandDto {
  @IsNumber()
  @ApiModelProperty()
  readonly id: number;
};
