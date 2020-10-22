import * as jwt from 'jsonwebtoken';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ObjectID } from 'mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// import * as nodemailer from 'nodemailer';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JWT_SECRET, JWT_EXPIRES } from '../config';
import { PersonService } from '../person/person.service';
import { PasswordService } from '../common/services/password.service'
import { v4 as uuidv4 } from 'uuid';
import { Person } from '../person/interfaces/person.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePersonDto } from '../person/dto/create-person.dto';
import { UserService } from '../user/user.service';
import { AgencyService } from '../agency/agency.service';
import { OrganisationService } from '../organisation/organisation.service';
import { PreferenceService } from '../preference/preference.service';
import { EmailService } from '../common/services/email.service';
import { PersonRole } from '../common/enums/person-role.enum';
import { EmailVerification } from './interfaces/email-verification.interface';
import { ForgottenPassword } from './interfaces/forgotten-password.interface';

@Injectable()
export class AuthService {
  constructor (
    private personService: PersonService,
    private userService: UserService,
    private agencyService: AgencyService,
    private organisationService: OrganisationService,
    private preferenceService: PreferenceService,
    private passwordService: PasswordService,
    private emailService: EmailService,
    @InjectModel('person')
    private readonly personRepository: Model<Person>,
    @InjectModel('emailverifications')
    private readonly emailVerificationRepository: Model<EmailVerification>,
    @InjectModel('forgottenpasswords')
    private readonly forgottenPasswordRepository: Model<ForgottenPassword>
  ) {}

  async createToken(email: string, id: ObjectID) {
    const token = jwt.sign({ email, id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return {
      expires_in: JWT_EXPIRES,
      access_token: token,
    }
  }

  async generateHash(password: string): Promise<string> {
    return this.passwordService.generatePassword(password);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.personService.findById(payload.id);
  }

  generateResetToken(): string {
    return uuidv4();
  }

  decodeActivationToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }

  async getForgottenPasswordModel(newPasswordToken: string): Promise<ForgottenPassword> {
    return await this.forgottenPasswordRepository.findOne({ newPasswordToken });
  }

  async createEmailToken(email: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationRepository.findOne({ email });
    if (emailVerification && ((new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15)) {
      // throw new HttpException('LOGIN.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      await this.emailVerificationRepository.findOneAndUpdate(
        { email },
        {
          email,
          emailToken: uuidv4(),
          timestamp: new Date()
        },
        { upsert: true }
      );
      return true;
    }
  }

  async createForgottenPasswordToken(email: string): Promise<ForgottenPassword> {
    const forgottenPassword = await this.forgottenPasswordRepository.findOne({ email });
    if (forgottenPassword && ((new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15)) {
      // throw new HttpException('RESET_PASSWORD.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const forgottenPassword = await this.forgottenPasswordRepository.findOneAndUpdate(
        { email },
        {
          email,
          newPasswordToken: uuidv4(),
          timestamp: new Date()
        },
        {
          upsert: true,
          new: true
        }
      );
      if (forgottenPassword) {
        return forgottenPassword;
      } else {
        throw new HttpException('LOGIN.ERROR>GENERIC_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async sendEmailVerification(email: string, req): Promise<boolean> {
    const model = await this.emailVerificationRepository.findOne({ email });
    if (model && model.emailToken) {
      return await this.emailService.sendingCustonEmail({
        to: email,
        subject: 'Verify email',
        text: 'Verify email',
        html: `Hi! 
        Thanks for your registration <a href="${req.protocol}://${req.headers.host}/auth/email/virify/${model.emailToken}"/> Click here for activation`
      })
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }

  async sendEmailForgotPassword(email: string, req): Promise<boolean> {
    const person = await this.personService.findByEmail(email);
    if (!person) {
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    const tokenModel = await this.createForgottenPasswordToken(email);
    if (tokenModel && tokenModel.newPasswordToken) {
      this.emailService.sendingCustonEmail({
        to: email,
        subject: 'Forgotten password',
        text: 'Forgotten password',
        html: `Hi!
        If you requested to reset your password
        <a href=${req.headers.host}:${req.headers.host.port}/auth/email/reset-password/${tokenModel.newPasswordToken}/>`
      })
      return true;
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }

  async checkPassword(email: string, password: string): Promise<boolean> {
    const person = await this.personService.findByEmail(email);
    const personPasswordHash = this.generateHash(password);
    if (!person) {
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return await bcrypt.compare(personPasswordHash, person.passwordHash);
  }
  
  async create(req, personDto: CreatePersonDto): Promise<Person> {
    const passwordHash = await this.passwordService.generatePassword(personDto.password);
    let user_info, 
        agency,
        agency_preferences,
        org_preferences,
        organisation = null;
    if (personDto.user_info && personDto.role === PersonRole.USER) {
      user_info = await this.userService.create(personDto.user_info, req);
    } else if (personDto.agency_info && personDto.agency_info.agency && personDto.role === PersonRole.AGENCY) {
      agency = await this.agencyService.create(personDto.agency_info.agency);
      if (personDto.agency_info.preferences) {
        agency_preferences = await this.preferenceService.create(personDto.agency_info.preferences);
      }
    } else if (personDto.org_info && personDto.role === PersonRole.ORG_SUB) {
      organisation = this.organisationService.create(personDto.org_info.organisation, req);
      if (personDto.org_info.preference) {
        org_preferences = await this.preferenceService.create(personDto.org_info.preference);
      }
    }
    const createdPerson = new this.personRepository({
      ...personDto,
      passwordHash,
      user_info,
      agency_info: {
        agency: agency && agency._id,
        preferences: agency_preferences && agency_preferences._id
      },
      org_info: {
        organisation: organisation && organisation._id,
        preferences: org_preferences && org_preferences._id
      }
    });
    const person = await createdPerson.save();

    // this.emailService.personCreation({
    //   email: person.email,
    //   password: personDto.password,
    //   firstName: person.firstName,
    //   lastName: person.lastName,
    //   url: `${req.protocol}://${req.headers.host}/login`,
    // })
    return person;
  }
}
