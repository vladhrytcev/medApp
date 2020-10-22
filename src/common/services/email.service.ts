import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
// import {
//   PersonCreationEmailOptionsDto,
//   ExternalJobCreationEmailDto,
//   ExternalJobDeletionDto,
//   InternalJobCreationEmailDto,
//   InternalJobDeletionDto,
// } from '../dto/email.dto';

const {
  EMAIL_USER
} = dotenv.parse(fs.readFileSync(process.env.PWD + '/.env'));

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService
  ) {  }

  public async sendingCustonEmail<T>(data: T): Promise<boolean> {
    try {
      return await this.mailerService.sendMail({
        ...data,
        from: EMAIL_USER,
      });
    } catch (err) {
      throw new HttpException(`Error: ${err.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // public async personCreation(data: PersonCreationEmailOptionsDto): Promise<void> {
  //   this.sendingCustonEmail<PersonCreationEmailOptionsDto>(
  //     data,
  //     data.email,
  //     'The new person is created'
  //   );
  // }

  // public async externalJobCreation(data: ExternalJobCreationEmailDto): Promise<void> {
  //   const { email } = data;
  //   this.sendingCustonEmail<ExternalJobCreationEmailDto>(
  //     data,
  //     email,
  //     'The new external job is created'
  //   );
  // }

  // public async internalJobCreation(data: InternalJobCreationEmailDto): Promise<void> {
  //   const { email } = data;
  //   this.sendingCustonEmail<InternalJobCreationEmailDto>(
  //     data,
  //     email,
  //     'The new internal job is created'
  //   );
  // }

  // public async externalJobDeletion(data: ExternalJobDeletionDto): Promise<void> {
  //   const { email } = data;
  //   this.sendingCustonEmail<ExternalJobDeletionDto>(
  //     data,
  //     email,
  //     'The external job is deleted'
  //   );
  // }

  // public async internalJobDeletion(data: InternalJobDeletionDto): Promise<void> {
  //   const { email } = data;
  //   this.sendingCustonEmail<InternalJobDeletionDto>(
  //     data,
  //     email,
  //     'The internal job is deleted'
  //   );
  // }
}
