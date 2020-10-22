import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBandDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;
}
