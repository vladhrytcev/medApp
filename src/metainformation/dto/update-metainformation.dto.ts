import { IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";
import { MetainformationFieldsDto } from './metainformation-fields.dto';
import { MetainformationJobTitlesDto } from './metainformation-jobTitles.dto';


export class UpdateMetainformationDto {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => MetainformationFieldsDto)
  @ApiModelProperty({ type: MetainformationFieldsDto, isArray: true })
  readonly fields?: MetainformationFieldsDto[];

  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: MetainformationJobTitlesDto })
  readonly jobTitles?: MetainformationJobTitlesDto;
}
