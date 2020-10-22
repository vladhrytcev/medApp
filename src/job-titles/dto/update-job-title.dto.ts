import { ValidateNested, IsEnum } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";
import { Languages } from '../../common/enums/languages.enum';
import { Qualifications } from '../../common/enums/qualifications.enum'
import { CreateJobDescription } from './create-job-description.dto';

export class UpdateJobTitleDto {
  @IsEnum(Languages)
  @ApiModelProperty({ enum: Languages })
  readonly language: Languages;

  @IsEnum(Qualifications)
  @ApiModelProperty({ enum: Qualifications })
  readonly qualification: Qualifications;

  @ValidateNested()
  @ApiModelProperty({ type: CreateJobDescription })
  readonly description: CreateJobDescription;
};
