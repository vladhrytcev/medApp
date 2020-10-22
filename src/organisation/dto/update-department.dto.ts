import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @IsString()
  @ApiModelProperty()
  readonly id: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly organisationId?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly name?: string;

  @IsArray()
  @IsOptional()
  @ApiModelProperty({ type: Array })
  readonly admins?: string[];

  @IsArray()
  @IsOptional()
  @ApiModelProperty({ type: Array })
  readonly users?: string[];
};
