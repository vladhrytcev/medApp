import { IsOptional, ValidateNested, IsArray, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateFieldDto } from './create-field.dto';
import { CreateAssociationDto } from './create-associations.dto';

export class CreateQualificationDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly level?: string;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateFieldDto })
  readonly primary_field?: CreateFieldDto;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateFieldDto)
  @ApiModelProperty({ type: CreateFieldDto, isArray: true})
  readonly additional_fields?: CreateFieldDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateAssociationDto)
  @ApiModelProperty({ type: CreateAssociationDto, isArray: true })
  readonly associations?: CreateAssociationDto[];
}
