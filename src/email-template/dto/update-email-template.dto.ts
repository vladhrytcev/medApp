import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { CreateEmailTemplateDto } from './create-email-template.dto';

export class UpdateEmailTemplateDto extends CreateEmailTemplateDto {
  @IsString()
  @ApiModelProperty()
  readonly id: string;
}
