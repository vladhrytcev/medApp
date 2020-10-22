import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Applicant } from './interfaces/applicant.interface';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { PersonService } from '../person/person.service';
import { AgencyService } from '../agency/agency.service';

@Injectable()
export class ApplicantService {
  constructor(
    private personService: PersonService,
    private agencyService: AgencyService,
    @InjectModel('applicants')
    private readonly applicantRepository: Model<Applicant>,
  ) { }

  async findAll(): Promise<Applicant[]> {
    return this.applicantRepository.find();
  }

  async findById(id: string): Promise<Applicant> {
    return this.applicantRepository.findById(id);
  }

  async findByName(name: string): Promise<Applicant> {
    return this.applicantRepository.findOne({ name });
  }

  async create(applicantDto: CreateApplicantDto): Promise<Applicant> {
    let person, agency = null;
    if (applicantDto.user) {
      person = await this.personService.findByEmail(applicantDto.user);
    }
    if (applicantDto.agency) {
      agency = await this.agencyService.findByName(applicantDto.agency);
    }
    const createdApplicant = new this.applicantRepository({
      ...applicantDto,
      user: person && person._id,
      agency: agency && agency._id
    });
    const applicant = createdApplicant.save();
    return applicant;
  }

  async update(updateDto: UpdateApplicantDto, id: string): Promise<Applicant> {
    return await this.applicantRepository.findByIdAndUpdate(id, updateDto);
  }

  async remove(id: string): Promise<Applicant> {
    return await this.applicantRepository.findByIdAndDelete(id);
  }
}
