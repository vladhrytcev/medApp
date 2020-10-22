import { IsString, IsBoolean, IsArray, IsOptional, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { JobState } from '../../common/enums/job-state.enum';

export class UpdatePartialJobDto {

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly title?: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly dates?: Array<string | number>;

  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly salary?: Array<string | number>;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly field?: string | number;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly orig_dept?: string | number;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly subtitle?: string;

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty()
  readonly accomodation?: boolean;

  @IsOptional()
  @IsEnum(JobState)
  @ApiModelProperty({ enum: JobState })
  readonly state?: JobState;

  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly applicants?: Array<string | number>;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly organisation?: string | number;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly jobType?: string | number;
  
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly jobOperation?: string | number;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly payment?: string | number;
};
