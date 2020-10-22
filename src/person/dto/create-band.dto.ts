import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBandDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly name?: string;
}
