import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateOrganisationDto } from '../../organisation/dto/create-organisation.dto';
import { CreatePersonDto } from '../../person/dto/create-person.dto';

export class CreateDepartmentDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateOrganisationDto })
  readonly organisationId: CreateOrganisationDto;

  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  @ApiModelProperty({ type: CreatePersonDto, isArray: true })
  readonly admins: CreatePersonDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  @ApiModelProperty({ type: CreatePersonDto, isArray: true })
  readonly users: CreatePersonDto[];

  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly defaultSkills: string[];

  @IsString()
  @ApiModelProperty()
  readonly metadata: string;
};
