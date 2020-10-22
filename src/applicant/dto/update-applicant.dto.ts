import { IsString, IsUrl, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateApplicantDto {
  @IsString()
  @ApiModelProperty()
  readonly id: number;

  @IsString()
  @ApiModelProperty()
  readonly job_id: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly location?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly state?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly person?: string;

  @IsUrl()
  @IsOptional()
  @ApiModelProperty()
  readonly agency?: string;
}
