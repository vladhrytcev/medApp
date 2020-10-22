import { IsString, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsEmail()
  @ApiModelProperty({ example: 'mail@example.com' })
  readonly email: string;

  @IsString()
  @ApiModelProperty({ example: 'password1234' })
  readonly newPassword: string;

  @IsString()
  @ApiModelProperty({ example: 'password1234' })
  readonly newPasswordToken: string;

  @IsString()
  @ApiModelProperty({ example: 'password1234' })
  readonly currentPassword: string;
}
