import { IsString, IsDate, IsBoolean, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateQualificationDto } from './create-qualification.dto';
import { CreateJobDto } from './create-job.dto';
import { CreateEducationDto } from './create-education.dto';
import { CreatePreferenceDto } from '../../preference/dto/create-preference.dto';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly address?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly postcode?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly city?: string;

  @IsOptional()
  @IsDate()
  @ApiModelProperty()
  readonly dob?: string;

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty()
  readonly extern_search?: boolean;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly bankdetails?: string;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateQualificationDto })
  readonly qualifications?: CreateQualificationDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateJobDto)
  @ApiModelProperty({ type: CreateJobDto, isArray: true })
  readonly jobs?: CreateJobDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateEducationDto)
  @ApiModelProperty({ type: CreateEducationDto, isArray: true })
  readonly education?: CreateEducationDto[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly documents?: string[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly skills?: string[];

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreatePreferenceDto })
  readonly preferences?: CreatePreferenceDto;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly creator?: string;
}
