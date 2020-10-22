import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailTemplate } from './interfaces/email-templates.interface';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class EmailTemplateService {
  constructor(
    private readonly emailService: EmailService,
    @InjectModel('emailtemplates')
    private readonly emailTemplateRepository: Model<EmailTemplate>
  ) {  }

  create(createDto: CreateEmailTemplateDto): Promise<EmailTemplate> {
    const createdTemplate = new this.emailTemplateRepository(createDto);
    return createdTemplate.save();
  }

  async fetchAll(): Promise<EmailTemplate[]> {
    return this.emailTemplateRepository.find();
  }

  findById(id: string): Promise<EmailTemplate> {
    return this.emailTemplateRepository.findById(id);
  }

  async update(id: string, updateDto: UpdateEmailTemplateDto): Promise<EmailTemplate> {
    await this.emailTemplateRepository.findByIdAndUpdate(id, updateDto);
    return this.findById(id);
  }

  async sendEmail(sendDto: SendEmailDto): Promise<void> {
    await this.emailService.sendingCustonEmail({
      to: sendDto.email,
      html: sendDto.content,
      subject: sendDto.subject
    });
  }
}