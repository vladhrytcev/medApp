import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { EmailService } from "../common/services/email.service";
import { Metainformation } from './interfaces/metainformation.interface';
import { Field } from './interfaces/field.interface';
import { Qualification } from './interfaces/qualification.interface';
import { CreateMetainformationDto } from './dto/create-metainformation.dto';
import { DeleteMetainformationDto } from './dto/delete-metainformation.dto';
import { MetainformationQualificationDto } from './dto/metainformation-qualification.dto';
import { MetainformationFieldsDto } from './dto/metainformation-fields.dto';
import { SendEmailDto } from './dto/send-email.dto';

const { EMAIL } = dotenv.parse(fs.readFileSync(process.env.PWD + '/.env'));

@Injectable()
export class MetainformationService {
  constructor(
    @InjectModel('metainformations')
    private readonly metainformationRepository: Model<Metainformation>,
    @InjectModel('fields')
    private readonly fieldsRepository: Model<Field>,
    @InjectModel('qualifications')
    private readonly qualificationRepository: Model<Qualification>,
    private readonly emailService: EmailService
  ) {  }

  async findAll(): Promise<Metainformation[]> {
    return this.metainformationRepository.find()
      .populate('fields', this.fieldsRepository)
      .populate({
        path: 'jobTitles.doctors',
        model: this.qualificationRepository,
        populate: {
          path: 'fields',
          model: this.fieldsRepository
        }
      })
      .populate({
        path: 'jobTitles.nurses',
        model: this.qualificationRepository,
        populate: {
          path: 'fields',
          model: this.fieldsRepository
        }
      })
      .exec();
  }

  async findAllFields(): Promise<Field[]> {
    return this.fieldsRepository.find();
  }

  async findFieldById(id: string): Promise<Field> {
    return this.fieldsRepository.find({
      $and: [{
        id
      }]
    });
  }

  async findAllQualifications(): Promise<Qualification[]> {
    return this.qualificationRepository.find()
      .populate('fields', this.fieldsRepository)
      .exec();
  }

  async findQualificationByStatus(status: string): Promise<Qualification[]> {
    return this.qualificationRepository.find({
      $and: [{
        status
      }]
    })
  }

  async findJobTitlesByQualification(qualification: string): Promise<Qualification[]> {
    return this.qualificationRepository.find({ qualification })
      .populate('fields', this.fieldsRepository)
      .exec();
  }

  async create(metainformationDto: CreateMetainformationDto): Promise<Metainformation> {
    const createMetainformation = new this.metainformationRepository(metainformationDto);
    return await createMetainformation.save();
  }

  async addQualification(createDto: MetainformationQualificationDto[]): Promise<Qualification> {
    let qualification;
    createDto.forEach(item => {
      const createdQualification = new this.qualificationRepository(item);
      qualification = createdQualification.save();  
    })
    return qualification;
  }

  async addField(createDto: MetainformationFieldsDto[]): Promise<Field> {
    let field;
    createDto.forEach(item => {
      const createdField = new this.fieldsRepository(item);
      field = createdField.save();  
    })
    return field;
  }

  async sendEmail(sendDto: SendEmailDto): Promise<boolean> {
    this.emailService.sendingCustonEmail({
      to: EMAIL,
      subject: '',
      text: '',
      html: `Date: ${sendDto.date}
      Hospital: ${sendDto.hospitalName}
      Email: ${sendDto.email}
      Phone: ${sendDto.phone}`
    })
    return true;
  }

  async remove(id: DeleteMetainformationDto): Promise<Metainformation> {
    return await this.metainformationRepository.remove(id);
  }
}
