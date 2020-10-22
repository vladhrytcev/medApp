import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateSalaryDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly activity?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly cost?: string;
}
