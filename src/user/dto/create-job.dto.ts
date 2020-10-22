import { IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @IsString()
  @ApiModelProperty()
  readonly title: string;

  @IsString()
  @ApiModelProperty()
  readonly startdate: string;

  @IsString()
  @ApiModelProperty()
  readonly enddate: string;

  @IsNumber()
  @ApiModelProperty()
  readonly location: number;
}
