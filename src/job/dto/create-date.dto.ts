import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateDateDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly startDate?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly endDate?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly activity?: string;
}
