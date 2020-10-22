import { IsString, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateUniversityDto } from '../../university/dto/create-university.dto';

export class CreateEducationDto {
  @IsOptional()
  @ValidateNested()
  @ApiModelProperty({ type: CreateUniversityDto })
  readonly university: CreateUniversityDto;

  @IsString()
  @ApiModelProperty()
  readonly startdate: string;

  @IsString()
  @ApiModelProperty()
  readonly enddate: string;

  @IsString()
  @ApiModelProperty()
  readonly qual_level: string;

  @IsArray()
  @ApiModelProperty({ type: Array })
  readonly doc: number[];
}
