import { IsString, IsUrl, IsOptional, IsArray, IsBase64 } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAgencyDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly name?: string;

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
  readonly country?: string;

  @IsOptional()
  @IsUrl()
  @ApiModelProperty()
  readonly url?: string;

  @IsOptional()
  @IsBase64()
  @ApiModelProperty()
  readonly logo?: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly contacts?: string[];

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly bankdetails?: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly userStorage?: string[];
}
