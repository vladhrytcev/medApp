import { IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateFieldDto {
  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly document_id?: number;
}
