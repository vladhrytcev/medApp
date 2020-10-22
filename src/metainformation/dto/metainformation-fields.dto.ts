import { IsOptional, ValidateNested, IsArray, IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import { MetainformationLanguageDto } from './metainformation-language.dto';

export class MetainformationFieldsDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: MetainformationLanguageDto })
  readonly value?: MetainformationLanguageDto;

  @IsOptional()
  @IsArray()
  @ApiModelProperty()
  readonly status?: string[];

  @IsString()
  @ApiModelProperty()
  readonly ID: string;
};
