import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAdminPrefDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly admin?: string;
}