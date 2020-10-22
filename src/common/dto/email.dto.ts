import { IsString, IsOptional, IsEmail, IsUrl } from 'class-validator';

export class CustomEmailOptionsDto {
  @IsString()
  readonly to: string;

  @IsString()
  readonly subject: string;

  @IsOptional()
  @IsString()
  readonly text?: string;

  @IsOptional()
  @IsEmail()
  readonly html?: string;

  @IsOptional()
  readonly context?: Object;
};

export class PersonCreationEmailOptionsDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsUrl()
  readonly url: string;
};

export class ExternalJobCreationEmailDto {
  @IsString()
  readonly title: string;

  @IsEmail()
  readonly email: string;
};

export class ExternalJobDeletionDto {
  @IsString()
  readonly title: string;

  @IsEmail()
  readonly email: string;
}
