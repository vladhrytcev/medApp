import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateAgencyDto } from '../../agency/dto/create-agency.dto';
import { CreateAgencyPrefDto } from '../../preference/dto/create-agencyPref.dto';
import { CreatePreferenceDto } from '../../preference/dto/create-preference.dto';

export class CreateAgencyInfoDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateAgencyDto })
  readonly agency?: CreateAgencyDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateAgencyDto)
  @ApiModelProperty({ type: CreateAgencyDto, isArray: true })
  readonly userStorage?: CreateAgencyDto[];

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateAgencyPrefDto })
  readonly preferences?: CreatePreferenceDto;
}
