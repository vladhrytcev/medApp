import { 
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { PersonRole } from '../../common/enums/person-role.enum';
import { PersonStatus } from '../../common/enums/person-status.enum';
import { CreateBandDto } from './create-band.dto';
import { CreateContactDto } from './create-contact.dto';
import { CreateRatingDto } from './create-rating.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { UpdateOrgInfoDto } from '../dto/update-orgInfo.dto';
import { UpdateAgencyInfoDto } from '../dto/update-agencyInfo.dto';

export class UpdatePersonDto {
  @IsOptional()
  @IsEmail()
  @ApiModelProperty()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({ example: 'password1234' })
  readonly password?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly lastName?: string;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateBandDto })
  readonly band?: CreateBandDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateContactDto)
  @ApiModelProperty({ type: CreateContactDto, isArray: true })
  readonly contact?: CreateContactDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateRatingDto)
  @ApiModelProperty({ type: CreateRatingDto, isArray: true })
  readonly rating?: CreateRatingDto[];

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: UpdateUserDto })
  readonly user_info?: UpdateUserDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: UpdateOrgInfoDto })
  readonly org_info?: UpdateOrgInfoDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: UpdateAgencyInfoDto })
  readonly agency_info?: UpdateAgencyInfoDto;

  @IsOptional()
  @IsEnum(PersonRole)
  @ApiModelProperty({ enum: PersonRole })
  readonly role?: PersonRole;

  @IsOptional()
  @IsEnum(PersonStatus)
  @ApiModelProperty({ enum: PersonStatus })
  readonly status?: PersonStatus;
}
