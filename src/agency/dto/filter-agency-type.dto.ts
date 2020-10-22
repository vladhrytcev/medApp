import { IsString, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
export class FilterAgencyDto {
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly name?: string;
}
