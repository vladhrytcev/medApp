import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsString()
  @ApiModelProperty()
  readonly title: string;

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

  @IsString()
  @ApiModelProperty()
  readonly content: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly filters?: Object[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly include_players_ids?: string[];

  @IsBoolean()
  @ApiModelProperty()
  readonly isSent: boolean;
}
