import { ValidateNested, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateUserPrefDto } from './create-userPref.dto';
import { CreateAgencyPrefDto } from './create-agencyPref.dto';
import { CreateAdminPrefDto } from './create-adminPref.dto';

export class CreatePreferenceDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateUserPrefDto })
  readonly userPref?: CreateUserPrefDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateAgencyPrefDto })
  readonly agencyPref?: CreateAgencyPrefDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateAdminPrefDto })
  readonly adminPref?: CreateAdminPrefDto;
}
