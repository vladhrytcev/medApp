import { IsString, IsBoolean, IsOptional } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class SendEmailDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly date?: string;

  @IsString()
  @ApiModelProperty()
  readonly hospitalName: string;

  @IsString()
  @ApiModelProperty()
  readonly email: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly phone?: string;

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty()
  readonly isAgree?: boolean;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly specialistValue?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly fieldValue?: string;
};
