import { IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { UpdateAgencyDto } from '../../agency/dto/update-agency.dto';
import { CreateAgencyPrefDto } from '../../preference/dto/create-agencyPref.dto';

export class UpdateAgencyInfoDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: UpdateAgencyDto })
  readonly agency?: UpdateAgencyDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateAgencyDto)
  @ApiModelProperty({ type: UpdateAgencyDto, isArray: true })
  readonly userStorage?: UpdateAgencyDto[];

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateAgencyPrefDto })
  readonly preference?: CreateAgencyPrefDto;
}
