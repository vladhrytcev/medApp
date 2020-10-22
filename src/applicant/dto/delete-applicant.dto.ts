import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteApplicantDto {
  @IsString()
  @ApiModelProperty()
  readonly id: string;
};
