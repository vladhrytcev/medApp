import { IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAssociationDto {
  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly association_id?: number;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty()
  readonly document_id?: number;
}
