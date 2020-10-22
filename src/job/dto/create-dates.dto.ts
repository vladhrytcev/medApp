import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateDateDto } from './create-date.dto';

export class CreateDatesDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly Type?: string;

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateDateDto })
  readonly date?: CreateDateDto;
}
