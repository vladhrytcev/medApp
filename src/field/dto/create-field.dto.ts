import { IsOptional, ValidateNested, IsArray } from "class-validator";
import { ApiModelProperty } from '@nestjs/swagger';

export class FieldDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: MetainformationLanguageDto })
  readonly value?: MetainformationLanguageDto;

  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly status?: string[];
}