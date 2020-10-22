import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateApplicantDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly job_id?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly location?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly state?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly user?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly agency?: string;
}
