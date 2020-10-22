import { IsOptional, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SpecialityDto {
  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly doctor?: string[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly nurse?: string[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly organisation?: string[];
}
