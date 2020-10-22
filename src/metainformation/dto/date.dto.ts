import { IsString, IsDate } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class DateDto {
  @IsDate()
  @ApiModelProperty()
  readonly startDate: string;

  @IsDate()
  @ApiModelProperty()
  readonly endDate: string;

  @IsString()
  @ApiModelProperty()
  readonly key: string;
}
