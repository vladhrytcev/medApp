import { IsArray, IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateJobDescription {
  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly active?: string[];

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly value?: string;
}

