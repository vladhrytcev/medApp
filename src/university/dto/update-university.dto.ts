import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUniversityDto {
  @IsString()
  @ApiModelProperty()
  readonly id: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly postcode?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly city?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly country?: string;
};
