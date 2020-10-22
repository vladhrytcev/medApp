import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUniversityDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly postcode: string;

  @IsString()
  @ApiModelProperty()
  readonly city: string;

  @IsString()
  @ApiModelProperty()
  readonly country: string;
};
