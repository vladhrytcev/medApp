import { IsOptional, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateJobLanguage } from './create-job-language.dto';

export class CreateJobTitleDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateJobLanguage })
  readonly doctors?: CreateJobLanguage;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateJobLanguage })
  readonly nurses?: CreateJobLanguage;
};
