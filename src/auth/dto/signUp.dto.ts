import { IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PersonRole } from '../../common/enums/person-role.enum';

export class SignUpDto {
  @IsEmail()
  @ApiModelProperty({ example: 'mail@example.com' })
  readonly email: string;

  @IsString()
  @ApiModelProperty({ example: 'password1234' })
  readonly password: string;

  @IsString()
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @ApiModelProperty()
  readonly lastName: string;

  @IsEnum(PersonRole)
  @ApiModelProperty({ enum: PersonRole })
  readonly role: PersonRole;
}
