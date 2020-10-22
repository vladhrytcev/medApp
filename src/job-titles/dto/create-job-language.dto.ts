import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateJobDescription } from './create-job-description.dto';

export class CreateJobLanguage {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateJobDescription)
  @ApiModelProperty({ type: CreateJobDescription, isArray: true })
  readonly de?: CreateJobDescription[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateJobDescription)
  @ApiModelProperty({ type: CreateJobDescription, isArray: true })
  readonly en?: CreateJobDescription[];
};
