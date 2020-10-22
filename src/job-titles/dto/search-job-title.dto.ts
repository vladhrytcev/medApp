import { IsEnum } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import { Qualifications } from "../../common/enums/qualifications.enum";
import { Languages } from "../../common/enums/languages.enum";

export class SearchJobTitle {
  @IsEnum(Qualifications)
  @ApiModelProperty({ type: Qualifications })
  readonly qualification: Qualifications;

  @IsEnum(Languages)
  @ApiModelProperty({ type: Languages })
  readonly language: Languages;
};
