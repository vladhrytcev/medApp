import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DocumentStreamDto {
  @IsString()
  @ApiModelProperty()
  readonly path: string;
}
