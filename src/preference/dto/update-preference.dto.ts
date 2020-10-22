import { ValidateNested, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UpdateUserPrefDto } from './update-userPref.dto';
import { UpdateAgencyPrefDto } from './update-agencyPref.dto';
import { UpdateAdminPrefDto } from './update-adminPref.dto';

export class UpdatePreferenceDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: UpdateUserPrefDto })
  readonly userPref?: UpdateUserPrefDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: UpdateAgencyPrefDto })
  readonly agencyPref?: UpdateAgencyPrefDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: UpdateAdminPrefDto })
  readonly adminPref?: UpdateAdminPrefDto;
}
