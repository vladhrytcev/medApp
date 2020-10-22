import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PersonRole } from '../../common/enums/person-role.enum';

export class LoginDto {
  @IsEmail()
  @ApiModelProperty({ example: 'mail@example.com' })
  readonly email: string;

  @IsString()
  @ApiModelProperty({ example: 'password1234' })
  readonly password: string;

  @IsOptional()
  @IsEnum(PersonRole)
  @ApiModelProperty({ enum: PersonRole })
  readonly role?: PersonRole;
}
