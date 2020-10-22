import { IsString, IsJSON, IsEnum, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EMAIL_TEMPLATES_TYPES } from '../../common/enums/email-templates.type.enum';

export class CreateEmailTemplateDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsString()
  @ApiModelProperty()
  readonly content: string;

  @IsJSON()
  @ApiModelProperty()
  readonly contentJSON: Object;

  @IsEnum(EMAIL_TEMPLATES_TYPES)
  @IsOptional()
  @ApiModelProperty({ enum: EMAIL_TEMPLATES_TYPES })
  readonly type?: EMAIL_TEMPLATES_TYPES;

  @IsString()
  @ApiModelProperty()
  readonly subject: string;
}
