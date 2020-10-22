import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteDepartmentDto {
  @IsString()
  @ApiModelProperty()
  readonly id: string;
};
