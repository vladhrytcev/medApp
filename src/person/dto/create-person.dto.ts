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
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { CreateOrgInfoDto } from '../dto/create-orgInfo.dto';
import { CreateAgencyInfoDto } from '../dto/create-agencyInfo.dto';

export class CreatePersonDto {
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
  @ApiModelProperty({ type: CreateUserDto })
  readonly user_info?: CreateUserDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateOrgInfoDto })
  readonly org_info?: CreateOrgInfoDto;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateAgencyInfoDto })
  readonly agency_info?: CreateAgencyInfoDto;

  @IsEnum(PersonRole)
  @IsOptional()
  @ApiModelProperty({ enum: PersonRole })
  readonly role?: PersonRole;

  @IsEnum(PersonStatus)
  @IsOptional()
  @ApiModelProperty({ enum: PersonStatus })
  readonly status?: PersonStatus;
}
