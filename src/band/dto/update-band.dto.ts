import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateBandDto {
  @IsNumber()
  @ApiModelProperty()
  readonly id: number;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly name?: string;
}
