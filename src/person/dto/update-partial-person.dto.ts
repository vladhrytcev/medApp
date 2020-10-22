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
import { CreateRatingDto } from '../dto/create-rating.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { CreateOrganisationDto } from '../../organisation/dto/create-organisation.dto';
import { CreateAgencyDto } from '../../agency/dto/create-agency.dto';

export class UpdatePartialPersonDto {
  @IsOptional()
  @IsEmail()
  @ApiModelProperty()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly passwordHash?: string;

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
  @Type(() => CreateBandDto)
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
  @Type(() => CreateUserDto)
  @ApiModelProperty({ type: CreateUserDto })
  readonly user_info?: CreateUserDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateOrganisationDto)
  @ApiModelProperty({ type: CreateOrganisationDto })
  readonly org_info?: CreateOrganisationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAgencyDto)
  @ApiModelProperty({ type: CreateAgencyDto })
  readonly agency_info?: CreateAgencyDto;

  @IsOptional()
  @IsEnum(PersonRole)
  @IsOptional()
  @ApiModelProperty({ enum: PersonRole })
  readonly role?: PersonRole;

  @IsOptional()
  @IsEnum(PersonStatus)
  @IsOptional()
  @ApiModelProperty({ enum: PersonStatus })
  readonly status?: PersonStatus;
}
