import { IsOptional, IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class MetainformationLanguageDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly de?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly en?: string;
}
