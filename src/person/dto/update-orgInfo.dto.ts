import { IsOptional, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateOrganisationDto } from '../../organisation/dto/create-organisation.dto';
import { CreatePreferenceDto } from '../../preference/dto/create-preference.dto';

export class UpdateOrgInfoDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateOrganisationDto })
  readonly organisation?: CreateOrganisationDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreatePreferenceDto })
  readonly preference?: CreatePreferenceDto;
}
