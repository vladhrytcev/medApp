import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteJobDto {
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly ids: string[];

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly socketId?: string;
}
