import { IsString, IsBoolean } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class SendEmailDto {
  @IsString()
  @ApiModelProperty()
  readonly date: string;

  @IsString()
  @ApiModelProperty()
  readonly hospital: string;

  @IsString()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @ApiModelProperty()
  readonly phone: string;

  @IsBoolean()
  @ApiModelProperty()
  readonly isAgree: boolean;
};
