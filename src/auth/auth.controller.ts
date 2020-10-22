import { 
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  Get,
  Param,
  HttpCode
} from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { PersonService } from '../person/person.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { PasswordService } from '../common/services/password.service';
import { TokenResponse } from './interfaces/token-response.interface';
import { ResponsePersonInfoDto } from '../person/dto/response-person.dto';
import { Person } from '../person/interfaces/person.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { IResponse } from '../common/interfaces/response.interface';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly personService: PersonService,
    private readonly passwordService: PasswordService,
  ) {  }

  @Post('registration')
  @ApiOperation({ title: 'Person registration' })
  @ApiResponse({ status: 200, type: ResponsePersonInfoDto })
  async create(@Req() req, @Body() signUpDto: SignUpDto): Promise<Person> {
    const person = await this.personService.findByEmail(signUpDto.email);
    await this.authService.createEmailToken(signUpDto.email);
    const isVerified = await this.authService.sendEmailVerification(signUpDto.email, req);
    if (person) {
      throw new HttpException('Person with this email already registred', HttpStatus.BAD_REQUEST);
    } 
    else if (!isVerified) {
      throw new HttpException('Person did not validate', HttpStatus.FORBIDDEN);
    }
    return this.authService.create(req, signUpDto);
  }

  @Post('login')
  @ApiOperation({ title: 'Login person' })
  @ApiResponse({ status: 200, type: LoginDto })
  async login(@Body() { email, password }: LoginDto): Promise<TokenResponse> {
    const person = await this.personService.findByEmailAuth(email);
    if (!person) throw new HttpException('Person was not found', HttpStatus.NOT_FOUND);

    const isValid = await this.passwordService.comparePassword(password, person.passwordHash);
    if (!isValid) throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);

    return this.authService.createToken(email, person['_id']);
  }

  // @Get('virify/:token')
  // @ApiOperation({ title: 'Verify by token' })
  // async virifyEmail(@Param('token') token): Promise<IResponse> {
  //   try {
  //     const isEmailVerified =  await this.authService.virifyEmail(token);
  //     return new ResponseSuccess('LOGIN.SUCCESS', isEmailVerified);
  //   } catch (err) {
  //     return new ResponseError('LOGIN.ERROR', err);
  //   }
  // }

  @Get('resend-verification/:email')
  @ApiOperation({ title: 'Resend virify' })
  async sendEmailVerification(@Param('email') email: string, @Req() req): Promise<IResponse> {
    try {
      await this.authService.createEmailToken(email);
      const isEmailSent = await this.authService.sendEmailVerification(email, req);
      if (isEmailSent) {
        return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
      } else {
        return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
      }
    } catch (err) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL', err);
    }
  }

  @Get('forgot-passwor/:email')
  @ApiOperation({ title: 'Sending forgotten password' })
  async sendEmailForgotPassword(@Param('email') email, @Req() req): Promise<IResponse> {
    try {
      const isEmailSent = await this.authService.sendEmailForgotPassword(email, req);
      if (isEmailSent) {
        return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
      } else {
        return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
      }
    } catch (err) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL', err);
    }
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Reset password' })
  async setNewPassword(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
    try {
      let isNewPasswordChanged: boolean = false;
      if (resetPassword.email && resetPassword.currentPassword) {
        const isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
        if (isValidPassword) {
          isNewPasswordChanged = await this.personService.setPassword(resetPassword.email, resetPassword.currentPassword);
        } else {
          return new ResponseError('RESET_PASSWORD.WRONG_CURRENT_PASSWORD');
        }
      } else if (resetPassword.newPasswordToken) {
        const forgottenPasswordModel = await this.authService.getForgottenPasswordModel(resetPassword.newPasswordToken);
        isNewPasswordChanged = await this.personService.setPassword(forgottenPasswordModel.email, resetPassword.newPassword);
        // if (isNewPasswordChanged) {
        //   await forgottenPasswordModel.remove();
        // }
      } else {
        return new ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR');
      }
      return new ResponseSuccess('RESET_PASSWORD.PASSWORD_CHANGED', isNewPasswordChanged);
    } catch (err) {
      return new ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR', err)
    }
  }
}
