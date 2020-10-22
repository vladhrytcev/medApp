import { IsString, IsOptional, IsEnum, IsNumber, IsUrl, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { PersonRole } from '../../common/enums/person-role.enum';
import { UpdateDepartmentDto } from './update-department.dto';

export class UpdateOrganisationDto {
  @IsNumber()
  @ApiModelProperty()
  readonly id: number;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly address?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly postcode: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly city: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly country: string;

  @IsUrl()
  @IsOptional()
  @ApiModelProperty()
  readonly url: string;

  @IsUrl()
  @IsOptional()
  @ApiModelProperty()
  readonly logo: string;

  @IsUrl()
  @IsOptional()
  @ApiModelProperty()
  readonly pics: string;

  @IsArray()
  @ValidateNested()
  @Type(() => UpdateDepartmentDto)
  @ApiModelProperty({ type: UpdateDepartmentDto, isArray: true })
  readonly departments: UpdateDepartmentDto[];

  @IsEnum(PersonRole)
  @IsOptional()
  @ApiModelProperty({ enum: PersonRole })
  readonly role?: PersonRole;
}
