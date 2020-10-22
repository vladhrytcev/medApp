import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { PersonRole } from '../../common/enums/person-role.enum';

export class FilterOrganisationDto {
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly name?: string;

  @IsEnum(PersonRole)
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly role?: PersonRole;
}
