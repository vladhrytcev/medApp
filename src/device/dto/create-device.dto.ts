import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @IsString()
  @ApiModelProperty()
  readonly fmcToken: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly bundleId?: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly sandbox: boolean;
}
