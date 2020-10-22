import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly org_id?: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty()
  readonly name?: string;

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly admins?: string[];

  @IsOptional()
  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly users?: string[];
};
