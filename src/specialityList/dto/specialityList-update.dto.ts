import { IsOptional, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateSpecialityDto {
  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly doctor?: string[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly nurse?: string[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly organisation?: string[];
}
