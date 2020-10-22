import { IsNumber, ValidateNested, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { JobType } from '../../common/enums/job-type.enum';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreatePersonDto } from '../../person/dto/create-person.dto';

export class UpdateUserPrefDto {
  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly distance?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  @ApiModelProperty({ type: CreatePersonDto })
  readonly field?: CreatePersonDto;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly minSalary?: number;

  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly jobTypes?: JobType[];
}
