import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly type?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly value?: string;
}
