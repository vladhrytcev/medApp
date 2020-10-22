import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly rating?: number;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly message?: string;
}
