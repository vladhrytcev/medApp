import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly createDate?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly subscriber?: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly segments?: string[];

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly content?: string;

  @IsOptional()
  @IsBoolean()
  @ApiModelProperty()
  readonly isSent?: boolean;
}
