import { ValidateNested, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { JobType } from '../../common/enums/job-type.enum';
import { CreateOrganisationDto } from '../../organisation/dto/create-organisation.dto';

export class CreateAgencyPrefDto {
  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: JobType, isArray: true })
  readonly jobTypes?: JobType[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly fields?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrganisationDto)
  @ApiModelProperty({ type: CreateOrganisationDto, isArray: true })
  readonly locations?: CreateOrganisationDto[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly jobOperations?: string[];

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty()
  readonly acceptTnC?: boolean;
}
