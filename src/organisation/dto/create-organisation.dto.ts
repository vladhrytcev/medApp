import { IsString, IsUrl, IsOptional, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrganisationDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly address?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly postcode?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly city?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly country?: string;

  @IsOptional()
  @IsUrl()
  @ApiModelProperty()
  readonly url?: string;

  @IsOptional()
  @IsUrl()
  @ApiModelProperty()
  readonly logo?: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly pics?: string[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly departments?: string[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly contacts?: string[];
}
