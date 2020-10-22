import { IsString, IsBoolean, IsArray, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { JobState } from '../../common/enums/job-state.enum';
import { JobType } from '../../common/enums/job-type.enum';
import { CreateDatesDto } from './create-dates.dto';
import { CreateApplicantDto } from '../../applicant/dto/create-applicant.dto';
import { CreateSalaryDto } from './create-salary.dto';


export class CreateJobDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly socketId?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly desc?: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly skills?: string[];

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly timeLimit?: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly orig_submission?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateDatesDto)
  @ApiModelProperty({ type: CreateDatesDto, isArray: true })
  readonly dates?: CreateDatesDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateSalaryDto)
  @ApiModelProperty({ type: CreateSalaryDto, isArray: true })
  readonly salary?: CreateSalaryDto[];

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly field?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly orig_dept?: string;

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
  @ValidateNested()
  @Type(() => CreateApplicantDto)
  @ApiModelProperty({ type: CreateApplicantDto, isArray: true })
  readonly applicants?: CreateApplicantDto[];

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly organisation?: string;

  @IsOptional()
  @IsEnum(JobType)
  @ApiModelProperty({ enum: JobType })
  readonly jobType?: JobType;
  
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly jobOperation?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly external_adv?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly payment?: string;
};
