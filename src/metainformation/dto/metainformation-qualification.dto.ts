import { IsOptional, IsArray, ValidateNested, IsEnum } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import { MetainformationLanguageDto } from "./metainformation-language.dto";
import { Qualifications } from '../../common/enums/qualifications.enum';

export class MetainformationQualificationDto {
  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly status?: string[];

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: MetainformationLanguageDto })
  readonly value?: MetainformationLanguageDto;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly fields?: string[];

  @IsEnum(Qualifications)
  @ApiModelProperty({ type: Qualifications })
  readonly qualification: Qualifications;
};
