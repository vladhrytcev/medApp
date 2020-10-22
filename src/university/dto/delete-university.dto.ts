import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteUniversityDto {
  @IsString()
  @ApiModelProperty()
  readonly id: string;
};
