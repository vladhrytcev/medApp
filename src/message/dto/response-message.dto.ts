import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResponseMessageDto {
  @IsString()
  @ApiModelProperty()
  readonly id: string;

  @IsNumber()
  @ApiModelProperty()
  readonly recipients: number;

  @IsString()
  @ApiModelProperty()
  readonly external_id: string;
}
