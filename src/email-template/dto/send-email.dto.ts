import { IsString, IsEmail } from 'class-validator';
import { ApiModelProperty  } from '@nestjs/swagger';

export class SendEmailDto {
  @IsString()
  @ApiModelProperty()
  readonly content: string;

  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @ApiModelProperty()
  readonly subject: string;
}
