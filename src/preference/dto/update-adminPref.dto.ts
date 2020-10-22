import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateAdminPrefDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly admin?: string;
}
