import { IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";
import { MetainformationQualificationDto } from './metainformation-qualification.dto';

export class MetainformationJobTitlesDto {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => MetainformationQualificationDto)
  @ApiModelProperty({ type: MetainformationQualificationDto, isArray: true })
  readonly doctors?: MetainformationQualificationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => MetainformationQualificationDto)
  @ApiModelProperty({ type: MetainformationQualificationDto, isArray: true })
  readonly nurses?: MetainformationQualificationDto[];
}