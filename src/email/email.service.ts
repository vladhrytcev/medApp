import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { Person } from '../person/interfaces/person.interface';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel('person')
    private readonly personRepository: Model<Person>
  ) {  }

  async sendEmail(id: number): Promise<boolean> {
    const userFirstName = await this.personRepository.findOne(id, 'firstName');
    const userSecondName = await this.personRepository.findOne(id, 'secondName');
    const userName = `${userFirstName} ${userSecondName}`
    const userEmail = await this.personRepository.findOne(id, 'email');
    if (!userEmail) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const transporter = nodemailer.createTransport({
      host: "<smtp-host>",
      port: "<port>",
      secure: false,
    });
    const mailOptions = {
      from: userName,
      to: userEmail,
      text: 'Create user',
      html: `Hi! <br><br>Create new user by admin ${userName}<br><br>`
    };
    const sended = await new Promise<boolean>(async function(resolve, reject) {
      return await transporter.sendEmail(mailOptions, async error => {
        if (error) {
          return reject(false);
        }
        resolve(true);
      })
    })
    return sended;
  }
}