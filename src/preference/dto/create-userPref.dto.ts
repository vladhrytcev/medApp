import { IsNumber, ValidateNested, IsOptional, IsArray } from 'class-validator';
import { JobType } from '../../common/enums/job-type.enum';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreatePersonDto } from '../../person/dto/create-person.dto';

export class CreateUserPrefDto {
  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly distance?: number;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreatePersonDto })
  readonly field?: CreatePersonDto;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly minSalary?: number;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: JobType, isArray: true })
  readonly jobTypes?: JobType[];
}
