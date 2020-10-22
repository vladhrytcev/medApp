import { IsString, IsUrl, IsOptional, IsArray, IsBase64 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAgencyDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly address?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly postcode?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly country?: string;

  @IsUrl()
  @IsOptional()
  @ApiModelProperty()
  readonly url?: string;

  @IsBase64()
  @IsOptional()
  @ApiModelProperty()
  readonly logo?: string;

  @IsArray()
  @IsOptional()
  @ApiModelProperty()
  readonly contacts?: string[];

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly bankdetails?: string;

  @IsArray()
  @IsOptional()
  @ApiModelProperty()
  readonly userStorage?: string[];

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly creator?: string;
}
